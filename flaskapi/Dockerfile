FROM  ubuntu:22.04

WORKDIR /app

RUN apt-get update && \
    apt-get install -yq tzdata && \
    ln -fs /usr/share/zoneinfo/Asia/Bangkok /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata
RUN apt update && apt install -y software-properties-common
RUN add-apt-repository ppa:deadsnakes/ppa
RUN apt update && apt install -y python3 python3-pip

RUN apt install nano -y
RUN apt update && apt-get install wget -y
RUN apt update && apt install curl -y
RUN apt-get update && apt-get -y install libpq-dev gcc
# Install pip reqs
RUN pip install redis
RUN pip install flask
RUN pip install numpy
RUN pip install -U flask-cors
RUN pip install psycopg2-binary
RUN pip install requests
RUN pip install slugify
RUN pip install schedule
# RUN python3 app.py