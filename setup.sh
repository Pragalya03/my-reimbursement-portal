
#!/bin/bash

# Define variables
PROJECT_DIR="/home/coder/project/workspace/question_generation_service/solutions/6d883e9c-da69-471a-8572-6f26e7aa9623/springapp"
DATABASE_NAME="6d883e9c_da69_471a_8572_6f26e7aa9623"

# Create Spring Boot project using Spring CLI
spring init \
  --type=maven-project \
  --language=java \
  --boot-version=3.4.0 \
  --packaging=jar \
  --java-version=17 \
  --groupId=com.examly \
  --artifactId=springapp \
  --name="Expense Reimbursement System" \
  --description="Expense Reimbursement System with Spring Boot" \
  --package-name=com.examly.springapp \
  --dependencies=web,data-jpa,validation,mysql \
  --build=maven \
  ${PROJECT_DIR}

# Wait for project creation to complete
sleep 2

# Create database
mysql -u root -pexamly -e "CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME};" 2>/dev/null || echo "Database creation failed, will use default"

# Configure application.properties
cat > "${PROJECT_DIR}/src/main/resources/application.properties" << EOL
spring.datasource.url=jdbc:mysql://localhost:3306/${DATABASE_NAME}?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=examly
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=create
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
EOL
