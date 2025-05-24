if ($args[0] -eq "--test"){
  ng build --configuration production
  ssh -i "C:\Users\lunan\.ssh\SSH_KEY_NEW" -p 22 webserver@192.168.1.69 "rm -rf /home/webserver/webserver/web/testing.lunalu.org/www/dist"
  scp -i "C:\Users\lunan\.ssh\SSH_KEY_NEW" -P 22 -r .\dist webserver@192.168.1.69:/home/webserver/webserver/web/testing.lunalu.org/www/
  ssh -i "C:\Users\lunan\.ssh\SSH_KEY_NEW" -p 22 webserver@192.168.1.69 "chmod 777 -R /home/webserver/webserver/web/testing.lunalu.org/www/dist"
  Write-Output "Done Webserver has been deployed to test server"
}
elseif ($args[0] -eq "--prod"){
  ng build --configuration production
  ssh -i "C:\Users\lunan\.ssh\SSH_KEY_NEW" -p 22 webserver@192.168.1.69 "rm -rf /home/webserver/webserver/web/wishlist.lunalu.org/www/dist"
  scp -i "C:\Users\lunan\.ssh\SSH_KEY_NEW" -P 22 -r .\dist webserver@192.168.1.69:/home/webserver/webserver/web/wishlist.lunalu.org/www/
  ssh -i "C:\Users\lunan\.ssh\SSH_KEY_NEW" -p 22 webserver@192.168.1.69 "chmod 777 -R /home/webserver/webserver/web/wishlist.lunalu.org/www/dist"
  Write-Output "Done Webserver has been deployed to produsction server"
}
else {
  Write-Output "---Invalid Agument---";
  Write-Output "--test      |     Deploy to testing server"
  Write-Output "--prod      |     Deploy to production server"
}
