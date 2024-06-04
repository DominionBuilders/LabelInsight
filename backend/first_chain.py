import os
from langchain_groq import ChatGroq
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains import create_retrieval_chain
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import PyPDFDirectoryLoader
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from dotenv import load_dotenv
import os
load_dotenv()

groq_api_key=os.getenv('GROQ_API_KEY')
os.environ["GOOGLE_API_KEY"]=os.getenv("GOOGLE_API_KEY")
os.environ["LANGCHAIN_API_KEY"] = os.getenv('LANGCHAIN_API_KEY')
os.environ["LANGCHAIN_TRACING_V2"] = "true"

llm=ChatGroq(groq_api_key=groq_api_key,
             model_name="Llama3-8b-8192")

prompt=ChatPromptTemplate.from_template(
"""
this is the extra contex provided
<context>
{context}
<context>
Questions:{input}

"""
)



embeddings=GoogleGenerativeAIEmbeddings(model = "models/embedding-004")
loader=PyPDFDirectoryLoader("./data") ## Data Ingestion
docs=loader.load() ## Document Loading
text_splitter=RecursiveCharacterTextSplitter(chunk_size=1000,chunk_overlap=200) ## Chunk Creation
final_documents=text_splitter.split_documents(docs[:20]) #splitting
vectors=FAISS.from_documents(final_documents,embeddings) #vector OpenAI embeddings



document_chain=create_stuff_documents_chain(llm,prompt)
retriever=vectors.as_retriever()
retrieval_chain=create_retrieval_chain(retriever,document_chain)
response=retrieval_chain.invoke({'input':"what all are the benchmarks for additives, give response in a structed way"})
print(response['answer'])
