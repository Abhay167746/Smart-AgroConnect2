from app import create_backend

app = create_backend()

if __name__ == "__main__":
    app.run(debug=True, port=5000)
