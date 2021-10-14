cp -r ./src/db ../files/src/db
# 
cp -r ./src/db ../1000Pagos-client/src/db
# 

#
cd ../files
git add .
git commit -m "new db"

# 
cd ../1000Pagos-client
git add .
git commit -m "new db"

# 
cd ../admin