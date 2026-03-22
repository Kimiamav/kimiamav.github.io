``` bash
Microsoft Windows [version 10.0.26200.7171]
(c) Microsoft Corporation. Tous droits réservés.

C:\Users\U020084>cd ../..

C:\>cd Temp

C:\Temp>cd jdk-11.0.28

C:\Temp\jdk-11.0.28>cd lib

C:\Temp\jdk-11.0.28\lib>cd security

C:\Temp\jdk-11.0.28\lib\security>keytool -importcert -file "Prisma SCOR Forward Trust.crt" -alias Prisma
'keytool' n’est pas reconnu en tant que commande interne
ou externe, un programme exécutable ou un fichier de commandes.

C:\Temp\jdk-11.0.28\lib\security>cd ../..

C:\Temp\jdk-11.0.28>cd bin

C:\Temp\jdk-11.0.28\bin>keytool
Key and Certificate Management Tool

Commands:

 -certreq            Generates a certificate request
 -changealias        Changes an entry's alias
 -delete             Deletes an entry
 -exportcert         Exports certificate
 -genkeypair         Generates a key pair
 -genseckey          Generates a secret key
 -gencert            Generates certificate from a certificate request
 -importcert         Imports a certificate or a certificate chain
 -importpass         Imports a password
 -importkeystore     Imports one or all entries from another keystore
 -keypasswd          Changes the key password of an entry
 -list               Lists entries in a keystore
 -printcert          Prints the content of a certificate
 -printcertreq       Prints the content of a certificate request
 -printcrl           Prints the content of a CRL file
 -storepasswd        Changes the store password of a keystore

Use "keytool -?, -h, or --help" for this help message
Use "keytool -command_name --help" for usage of command_name.
Use the -conf <url> option to specify a pre-configured options file.

C:\Temp\jdk-11.0.28\bin>keytool -importcert -file "..\lib\security\Prisma SCOR Forward Trust.crt" -alias Prisma
Enter keystore password:

Re-enter new password:

Owner: CN=Prisma SCOR Forward Trust, OU=SCOR IT, O=SCOR SE
Issuer: CN=SCOR Internet CA v2, OU=SCOR IT, O=SCOR SE.
Serial number: 28d72cc0
Valid from: Tue Nov 18 09:25:49 CET 2025 until: Fri Nov 17 09:25:49 CET 2028
Certificate fingerprints:
         SHA1: 36:E7:50:07:A0:05:95:53:32:09:07:99:C8:D4:62:45:29:5D:EA:3B
         SHA256: 99:50:B5:17:C3:95:72:E3:3A:B8:DF:BE:FC:D5:BE:CD:73:CD:C3:5F:B4:3F:C8:BD:FF:7F:67:BA:4D:D8:5A:53
Signature algorithm name: SHA256withRSA
Subject Public Key Algorithm: 2048-bit RSA key
Version: 3

Extensions:

#1: ObjectId: 2.5.29.19 Criticality=false
BasicConstraints:[
  CA:true
  PathLen:2147483647
]

#2: ObjectId: 2.5.29.15 Criticality=false
KeyUsage [
  Key_CertSign
]

Trust this certificate? [no]:  yes
Certificate was added to keystore

C:\Temp\jdk-11.0.28\bin>keytool -importcert -file "..\lib\security\Prisma SCOR Forward Trust.crt" -alias Prisma  -keystore ..\lib\security\cacerts
Warning: use -cacerts option to access cacerts keystore
Enter keystore password:

Owner: CN=Prisma SCOR Forward Trust, OU=SCOR IT, O=SCOR SE
Issuer: CN=SCOR Internet CA v2, OU=SCOR IT, O=SCOR SE.
Serial number: 28d72cc0
Valid from: Tue Nov 18 09:25:49 CET 2025 until: Fri Nov 17 09:25:49 CET 2028
Certificate fingerprints:
         SHA1: 36:E7:50:07:A0:05:95:53:32:09:07:99:C8:D4:62:45:29:5D:EA:3B
         SHA256: 99:50:B5:17:C3:95:72:E3:3A:B8:DF:BE:FC:D5:BE:CD:73:CD:C3:5F:B4:3F:C8:BD:FF:7F:67:BA:4D:D8:5A:53
Signature algorithm name: SHA256withRSA
Subject Public Key Algorithm: 2048-bit RSA key
Version: 3

Extensions:

#1: ObjectId: 2.5.29.19 Criticality=false
BasicConstraints:[
  CA:true
  PathLen:2147483647
]

#2: ObjectId: 2.5.29.15 Criticality=false
KeyUsage [
  Key_CertSign
]

Trust this certificate? [no]:  yes
Certificate was added to keystore
```

