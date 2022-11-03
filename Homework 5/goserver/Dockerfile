FROM golang:latest

WORKDIR /goserver
COPY main.go ./
RUN go mod init artzhemch/MIPT_WEB
RUN go mod tidy
RUN go mod vendor
RUN go build -o main.exe ./main.go

EXPOSE 80

CMD ["./main.exe"]