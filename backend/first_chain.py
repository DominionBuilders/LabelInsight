import os
from langchain_groq import ChatGroq
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains import create_retrieval_chain
from main import vectors
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


document_chain=create_stuff_documents_chain(llm,prompt)
retriever=vectors.as_retriever()
retrieval_chain=create_retrieval_chain(retriever,document_chain)
response=retrieval_chain.invoke({'input':"what all are the benchmarks for additives, give response in a structed way"})
print(response['answer'])
