import chainlit as cl
import os
from langchain_groq import ChatGroq
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_community.document_loaders import WebBaseLoader
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_core.vectorstores import InMemoryVectorStore
from langchain_text_splitters import RecursiveCharacterTextSplitter
import bs4
from langchain.vectorstores import FAISS
from langchain_community.document_loaders import PyPDFLoader

os.environ["GOOGLE_API_KEY"] = "AIzaSyAp-0dcKqpbSzS809JOtTbbKDdIW-ArO9M"
os.environ["GROQ_API_KEY"] = "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"

urls = [
    "https://www150.statcan.gc.ca/n1/pub/11-627-m/11-627-m2023025-eng.htm",
    "https://www.state.gov/reports/united-states-strategy-to-respond-to-the-effects-of-climate-change-on-women-2023/",
    "https://www.earthdata.nasa.gov/topics/human-dimensions/social-behavior/environmental-justice"
]

embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000, chunk_overlap=100)

all_documents = []
for url in urls:
    loader = WebBaseLoader(
        web_paths=(url,),
        bs_kwargs=dict(
            parse_only=bs4.SoupStrainer(
                class_=("post-content", "post-title", "post-header")
            )
        ),
    )
    documents = loader.load()
    all_documents.extend(documents)

def process_file(file_path):
    loader = PyPDFLoader(file_path)
    documents = loader.load()
    
    docs = text_splitter.split_documents(documents)
    for i, doc in enumerate(docs):
        doc.metadata["source"] = f"source_{i}_{os.path.basename(file_path)}"
    return docs

def process_folder(folder_path):
    all_docs = []
    for filename in os.listdir(folder_path):
        if filename.endswith(".pdf"):
            file_path = os.path.join(folder_path, filename)
            docs = process_file(file_path)
            all_docs.extend(docs)
    return all_docs

def get_docsearch(folder_path):
    docs = process_folder(folder_path)
    docsearch = FAISS.from_documents(docs, embeddings)
    return docsearch

folder_path = "pdf"  
pdf_documents = process_folder(folder_path)
all_documents.extend(pdf_documents)

text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
splits = text_splitter.split_documents(all_documents)

vectorstore = InMemoryVectorStore.from_documents(
    documents=splits, embedding=embeddings
)
retriever = vectorstore.as_retriever()

llm = ChatGroq(model="mixtral-8x7b-32768", temperature=0)

system_prompt = (
    "You are an assistant participating in a debate. You will answer questions "
    "using specific examples from different countries or regions where relevant. "
    "Cite real-world examples of how climate change has affected gender inequalities, and how gender "
    "dynamics can influence climate-related policies or actions."
    "\n\n"
    "After providing the analysis, raise a related follow-up question to deepen the discussion."
    "\n\n"
    "Context: {context}"
)

prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt),
        ("human", "{input}"),
    ]
)

question_answer_chain = create_stuff_documents_chain(llm, prompt)
rag_chain = create_retrieval_chain(retriever, question_answer_chain)

@cl.on_chat_start
async def start():
    await cl.Message(content="The system is ready! Ask your questions about climate and gender.").send()
    cl.user_session.set("rag_chain", rag_chain)

@cl.on_message
async def main(message: cl.Message):
    chain = cl.user_session.get("rag_chain")
    res =  chain.invoke(({"input": message.content}))
    
    answer = res["answer"]
    await cl.Message(content=answer).send()
