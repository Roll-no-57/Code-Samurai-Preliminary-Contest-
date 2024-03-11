# BUET_FRIENDS

🎓 **University:** Bangladesh University Of Engineering And Technology

📧 **Emails:**
- [jonayedmohiuddin@gmail.com](mailto:jonayedmohiuddin@gmail.com)
- [aoarish397@gmail.com](mailto:aoarish397@gmail.com)
- [mohiuddinsizan13@gmail.com](mailto:mohiuddinsizan13@gmail.com)

## 🐳 How to Run
- **ENV-SETUP:** Remove the `.env` file (or edit it). Create a `.env` file in the root directory and set the following environment variables
```env
DB_HOST=localhost
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=your_db_database_name
DB_PORT=5432

APP_PORT=8000
```

- **BUILD(DETACHED):** Type the following command in the terminal to build and run the docker container
```bash
docker-compose up -d --build 
```
- **BUILD:** Or, if you want to see the logs of the container and do not want to run it in detached mode, use the following command (Wont be able to use the terminal after running this command)
```bash
docker-compose up --build
```

- **RE-RUN:** If small changes are made to the code, the following command can be used to rerun the container without rebuilding the image
```bash
docker-compose down
docker-compose up
```

- **RE-BUILD:** If dockerfile or docker-compose.yml is changed, the following command can be used to rebuild the image and run the container
```bash
docker-compose down
docker-compose up -d --build
```

- **STOP:** To stop the container, use the following command
```bash
docker-compose down
```

- **REMOVE:** To remove the container, image, and the volume, use the following command
```bash
docker-compose down --rmi all -v
```

- After running the container, the application can be accessed at [http://localhost:8000](http://localhost:8000)

