<h1 align="center" style="border-bottom: none;">Przykładowa aplikacja używająca Watson Assistant</h1>
<h3 align="center">Aplikacja w Node.js demonstruje użycie usługi IBM Watson Assistant w prostym interfejsie webowym. Czat obsługuje prostą interakcję podczas zamawiania pizzy. Demonstracja nie jest pełna implementacja przypadku, jedynie starterem do rozpoczęcia pracy z tą technologią.</h3>

![Demo](readme_images/demo.gif)

Możesz obejrzeć [demo][demo_url] tej aplikacji.


## Jak zacząć?

1. Zaloguj sie do konta [IBM Cloud account](https://cloud.ibm.com/registration/).
1. Ściągnij [IBM Cloud CLI](https://cloud.ibm.com/docs/cli/index.html#overview).
1. Utwórz usługę Watson Assistant, pobierz apikey i url:
    - Wejdź na stronę [Watson Assistant](https://cloud.ibm.com/catalog/services/conversation) w IBM Cloud Catalog.
    - Zaloguj się do IBM Cloud.
    - Wybierz **Create**.
    - Wybierz **Show**, żeby zobaczyć apikey.
    - Skopiuj `apikey`.
    - Skopiuj `url`.

## Konfiguracja aplikacji

1. W konsoli IBM Cloud, otwórz konsolę do usługi Watson Assistant.

2. Wybierz ikonkę **Import workspace** i załaduj swoją kopię pliku JSON z pełną konfiguracją czatbota:

    `<project_root>/skill-WatsonPizzeria.json.json`

3. Wybierz **Everything (Intents, Entities, and Dialog)** i kliknij **Import**. 

4. Kliknij ikonkę menu w prawym górnym rogu płytki z załadowanym workspace i wybierz **View details**.

5. Kliknij ikonkę kopiowania żeby skopiować workspaceID.

6. W katalogu projektu skopiuj plik *.env.example* file and create a file called *.env*

    ```
    cp .env.example .env
    ```

7. Otwórz plik *.env* i uzupełnij `WORKSPACE_ID`,  `ASSISTANT_IAM_APIKEY`, `ASSISTANT_URL` zgodnie z twoimi ustawieniami. Przykładowy plik *.env* podaje url skonfigurowany do usługi Watson Assistant działającej w regionie Frankfurt:

    ```
	WORKSPACE_ID=""

	ASSISTANT_IAM_APIKEY=""
	ASSISTANT_URL="https://gateway-fra.watsonplatform.net/assistant/api/"
    ```
8. Utwórz integracje dla Watson Assistant. W konsoli Watson Assistant w lewym górnym rogu wybierz z menu Assistants. Kliknij **Create assistant**, na następnej stronie **Add integration** wybierz **Preview Link** i utwórz go. Skopiuj id, które jest ostatnim elementem podanego linku do strony (który powinien mieć format np. https://assistant-chat-eu-de.watsonplatform.net/web/public/39dca9f1-0485-4c43-880e-75ec61adacc5) i uzupełnij id linii 41 w pliku index.html w katalogu public.

## Uruchamianie lokalnie

1. Zainstaluj zależności

    ```
    npm install
    ```

1. Uruchom aplikację

    ```
    npm start
    ```

1. Otwórz aplikację w przeglądarce
   `localhost:8080`

## Uruchom w IBM Cloud w Cloud Foundry

1. Zaloguj się do IBM Cloud z linii poleceń [IBM Cloud CLI](https://cloud.ibm.com/docs/cli/index.html#overview)

    ```
    ibmcloud login
    ```

1. Połącz sie do organizacji i przestrzeni w Cloud Foundry.

    ```
    ibmcloud target --cf
    ```

1. Zmień plik *manifest.yml*. Ustaw pole **name** na unikalną wartość.  
  Na przykład, `- name: my-app-name`.
1. Zainstaluj aplikację

    ```
    ibmcloud app push
    ```

1. Otwórz aplikację online zgodnie z twoimi ustawieniami.  
Na przykład: https://pizzabot.eu-de.mybluemix.net/


[demo_url]: https://pizzabot.eu-de.mybluemix.net/
[doc_intents]: https://cloud.ibm.com/docs/services/conversation/intents-entities.html#planning-your-entities
[docs]: https://cloud.ibm.com/docs/services/assistant/index.html#index
[docs_landing]: (https://cloud.ibm.com/docs/services/assistant/index.html#index)
[node_link]: (http://nodejs.org/)
[npm_link]: (https://www.npmjs.com/)
[sign_up]: https://cloud.ibm.com/registration
