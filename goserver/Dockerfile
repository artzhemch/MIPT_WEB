FROM golang:latest

WORKDIR /goserver
COPY main.go ./

RUN go build -o main.exe ./main.go

EXPOSE 80

CMD ["./main.exe"]