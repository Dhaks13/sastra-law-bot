#!/usr/bin/env python
# coding: utf-8

# In[2]:


import pandas as pd
import numpy as np
from transformers import AutoTokenizer
from sklearn.model_selection import train_test_split
import pyarrow as pa
from datasets import Dataset
from transformers import AutoModelForSequenceClassification
from transformers import TrainingArguments, Trainer
import torch
from sklearn.preprocessing import LabelEncoder
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from keras.models import Sequential
from keras.layers import Dense, Embedding, Flatten
from tensorflow.keras.utils import to_categorical
from sklearn.metrics import confusion_matrix
from sklearn.metrics import confusion_matrix, accuracy_score, precision_score, recall_score, f1_score
import matplotlib.pyplot as plt
from tensorflow.keras.optimizers import Adam
import json

"""training part"""

def process_data(row):
    text = row['text']
    text = str(text)
    text = ' '.join(text.split())
    encodings = tokenizer(text, padding="max_length", truncation=True, max_length=128)
    label = 0
    if row['res'] == 'not family':
        label += 1
    encodings['label'] = label
    encodings['text'] = text
    return encodings

def process_data1(row):

    text = row['text']
    text = str(text)
    text = ' '.join(text.split())
    encodings = tokenizer1(text, padding="max_length", truncation=True, max_length=128)
    label = 0
    if row['res'] == 'dismissed':
        label += 1
    encodings['label'] = label
    encodings['text'] = text
    return encodings

#family or not family
def train_fam_notfam():
        df = pd.read_csv('/content/drive/MyDrive/fam_files_new.csv')
        tokenizer = AutoTokenizer.from_pretrained('bert-base-uncased')
        processed_data = []
        for i in range(len(df[:2000])):
            processed_data.append(process_data(df.iloc[i]))
        new_df = pd.DataFrame(processed_data)
        train_df, valid_df = train_test_split(
            new_df,
            test_size=0.2,
        )
        train_hg = Dataset(pa.Table.from_pandas(train_df))
        valid_hg = Dataset(pa.Table.from_pandas(valid_df))
        model = AutoModelForSequenceClassification.from_pretrained(
            'bert-base-uncased',
            num_labels=2
        )
        training_args = TrainingArguments(output_dir="./result", evaluation_strategy="epoch")
        trainer = Trainer(
            model=model,
            args=training_args,
            train_dataset=train_hg,
            eval_dataset=valid_hg,
            tokenizer=tokenizer
        )
        trainer.train()
        trainer.evaluate()
        model.save_pretrained('/content/drive/My Drive/model') #change the path
        training_args.save_json('/content/drive/My Drive/training_args.json')


def compute_metrics(eval_pred):
    logits, labels = eval_pred
    predictions = np.argmax(logits, axis=-1)
    accuracy = accuracy_score(labels, predictions)
    return {"accuracy": accuracy}

def train_classification():
        tokenizer1 = AutoTokenizer.from_pretrained('bert-base-uncased')
        model1 = AutoModelForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=2)
        dataframe = pd.read_csv("/content/drive/MyDrive/VR7_new.csv")
        dataframe = dataframe.dropna(subset=['text'])
        filtered_dataframe = dataframe[dataframe['res'].isin(['dismissed', 'disposed'])]
        processed_data1 = []
        for i in range(len(filtered_dataframe[:550])):
            processed_data1.append(process_data1(filtered_dataframe.iloc[i])) #process data1 is an function

        new_df1 = pd.DataFrame(processed_data1)
        train_df1, valid_df1 = train_test_split(new_df1, test_size=0.2)

        # Convert data into Hugging Face Datasets
        train_hg1 = Dataset.from_pandas(train_df1)
        valid_hg1 = Dataset.from_pandas(valid_df1)

        # Define TrainingArguments and Trainer
        training_args1 = TrainingArguments(
            output_dir="./result1",
            evaluation_strategy="epoch",
            logging_dir='./logs',
            logging_steps=10,
            save_total_limit=2,
            per_device_train_batch_size=8,
            per_device_eval_batch_size=16,
            num_train_epochs=3,
            weight_decay=0.01,
            load_best_model_at_end=True,
            metric_for_best_model="accuracy",
            save_strategy="epoch"
        )

        trainer1 = Trainer(
            model=model1,
            args=training_args1,
            train_dataset=train_hg1,
            eval_dataset=valid_hg1,
            tokenizer=tokenizer1,
            compute_metrics=compute_metrics
        )

        # Train the model
        trainer1.train()
        evaluation_results = trainer1.evaluate()
        model1.save_pretrained('/content/drive/My Drive/model1') #change the path
        training_args1.save_json('/content/drive/My Drive/training_args1.json')
        
"""prediction part"""

#family or not family
def get_prediction(text):
    
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    new_tokenizer = AutoTokenizer.from_pretrained('bert-base-uncased')
    new_model = AutoModelForSequenceClassification.from_pretrained('/content/drive/My Drive/model1').to(device)
    training_args = TrainingArguments.from_json_file('/content/drive/My Drive/training_args.json')
    trainer = Trainer(
        model=new_model,
        args=training_args
    )
    encoding = new_tokenizer(text, return_tensors="pt", padding="max_length", truncation=True, max_length=128)
    encoding = {k: v.to(trainer.model.device) for k,v in encoding.items()}

    outputs = new_model(**encoding)

    logits = outputs.logits
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    sigmoid = torch.nn.Sigmoid()
    #print(sigmoid)
    probs = sigmoid(logits.squeeze().cpu())
    probs = probs.detach().numpy()
    label = np.argmax(probs, axis=-1)
    if label == 0:
        c='family'
    else:
        c='not family'
        return {
            'category': 'not family',
            'probability': probs[1]
        }

    if c=='family' and probs[0]>0.8:
        get_prediction1(text,probs[0])
    else:
        return {
            'category': 'not family',
            'probability': probs[0]
        }

#for disposed or dismissed
def get_prediction1(text,prob):
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    new_tokenizer = AutoTokenizer.from_pretrained('bert-base-uncased')
    new_model = AutoModelForSequenceClassification.from_pretrained('/content/drive/My Drive/model1').to(device)
    training_args = TrainingArguments.from_json_file('/content/drive/My Drive/training_args1.json')
    trainer = Trainer(
        model=new_model,
        args=training_args
    )
    encoding = new_tokenizer(text, return_tensors="pt", padding="max_length", truncation=True, max_length=128)
    encoding = {k: v.to(trainer1.model.device) for k,v in encoding.items()}

    outputs = new_model(**encoding)

    logits = outputs.logits
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    sigmoid = torch.nn.Sigmoid()
    #print(sigmoid)
    probs = sigmoid(logits.squeeze().cpu())
    probs = probs.detach().numpy()
    label = np.argmax(probs, axis=-1)
    if label == 0:
        results=f"family case disposed({probs[0]}) with accuracy of  {prob*100:.2f}%"
        print(results)
    else:
        results=f"family case dismissed({probs[1]}) with accuracy of  {prob*100:.2f}%"
        print(results)
        
        
#file extraction from pdf
import pdfplumber
def extract_text_from_pdf(pdf_path):
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"
    return text

pdf_path = "/content/drive/MyDrive/os.pdf"
pdf_text = extract_text_from_pdf(pdf_path)
get_prediction(pdf_text)


# In[ ]:




