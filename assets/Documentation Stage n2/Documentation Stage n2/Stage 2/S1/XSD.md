Un fichier XSD est utilisé pour décrire le schéma des fichiers XML. La structure et les types d'éléments peuvent être décrits à l'aide du XSD suivant, utilisé comme XSD d'entrée d'exemple dans cette section. Pour plus d'informations concernant les schémas XML, 
Il permet de définir de façon structurée le type de contenu, la syntaxe et la schématique d'un document XML, il également utilisé pour valider un document XML.


#### XML Schema

> - langage de definition de document XML plus puissant que la DTD :
>     - définit des éléments lexicaux, des structures syntaxiques et des types.
>     - permet d'exprimer la "grammaire" :
>         - des langages à structures XML (balises, emboitement, ID, IDRef, ..)
>         - des données des langages de programmation (type complexes, types dérivés, héritage, ...)
>         - des données de tables de bases de données
> - Pour conformer un document XML à un schema :
> 
> <racine
>   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
>   xsi:schemaLocation="http://.../monSchema.xsd">
>  ........... le document XML ..............
> </racine>


- Marshaling :
    
    - il s'agit de transformer un objet en document XML
        - içi, un objet Chien en document XML
    - marshall, c'est agréger
    - 
        
```Java
        |   |
        |---|
        |import javax.xml.bind.JAXBContext;<br>import javax.xml.bind.JAXBException;<br>import javax.xml.bind.Marshaller;<br>import chienp.*;<br><br>public class Creer {   <br>    public static void main( String[] args ) {<br>        try {<br>            JAXBContext jc = JAXBContext.newInstance( "chienp" );<br>            ObjectFactory factory = new ObjectFactory();<br>            Chien medor = factory.createChien();<br>            medor.setNom("medor");<br>            Personne memere = factory.createPersonne();<br>            memere.setNom("Michu");<br>            memere.setAdresse("impasse du puit");<br>            medor.setMaitre(memere);<br>            medor.setPuces(76);<br>            Marshaller m = jc.createMarshaller();<br>            m.setProperty( Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);<br>            m.marshal(medor, System.out);<br>        } catch( Exception e ) {<br>            e.printStackTrace();<br>        }<br>    }<br>}|
        
```
          
        Les méthodes createChien, setNom, .... sont celles du package chienp