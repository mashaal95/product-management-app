# Product Management React FrontEnd

This project allows the viewing of products for a sample Product Management System. 
It uses React Hook Forms for the Creation and updation of products. For the main table, MUI elements were used.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information. Use it to run the Jest based tests for the forms page.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Install a Docker instance

```bash
sudo docker pull mcr.microsoft.com/mssql/server:2022-latest
```

Or if you're on Windows 
```powershell
docker pull microsoft/mssql-server-windows-developer
```

## Configure the Docker instance 

Use the following commands to setup the password and port number for the instance

```powershell
docker run --name SQLServer -d -p 1433:1433 -e sa_password=MediumPuffyEy3s -e ACCEPT_EULA=Y microsoft/mssql-server-windows-developer
```
Start the instance
```powershell
docker start SQLServer
```

## Azure Data Studio
Using Azure Data Studio to connect to the SQL Server instance
Now that our SQL Server Docker container is up and running on port 1433, let us start Azure Data Studio and try connecting to the instance. Open up Azure Data Studio and use the same credentials to connect to it.

Connecting to the SQL Server instance from Azure Data Studio
Figure 8 – Connecting to the SQL Server instance from Azure Data Studio

As soon as it is connected, you can see the version information of the SQL Server instance.

### SQL Server instance connected

![alt text](https://www.sqlshack.com/wp-content/uploads/2021/04/connecting-to-the-sql-server-instance-from-azure-d.png)

Now that the database is connected from Azure Data Studio, you are good to run SQL commands to it. Let us create our database and add Products table into it
```sql
CREATE DATABASE PRODUCTSDB
USE PRODUCTSDB
CREATE TABLE PRODUCTS(ID UNIQUEIDENTIFIER, NAME NVARCHAR(50),PRICE FLOAT,TYPE NVARCHAR(50),ACTIVE BIT)
```
Voila! And your DB is ready to go!

