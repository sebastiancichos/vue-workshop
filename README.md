# vue-workshop

> Warsztat Vue.js

To jest repozytorium na potrzeby warsztatów Vue.js, które prowadzę dla [infoShare Academy](http://infoshareacademy.com/).

## Uruchomienie serwera developerskiego

``` bash
npm install
npm run dev
```

Więcej w `package.json`.

## Uruchomienie serwera API
``` bash
cd server
npm install
npm start
```

## Zadania

**Staraj się nie robić zadań do przodu. Na każdą linijkę każdego punktu poniższej listy został
przewidziany odpowiednio długi czas i moment podczas warsztatów.** Poniższa lista jest raczej po to,
aby ułatwić Ci przypomnienie sobie, co masz zrobić.

1. To jest początkowy stan aplikacji, zapoznaj się z nią.
2. Dodaj pole `appName` do data i wyświetl w navbarze używając `{{ wąswów }}`. Spróbuj użyć wyrażenia, aby dodać coś do tekstu.
   <br> Dodaj pole `page` do data i użyj zdarzenia z podpiętą metodą na przyciusku aby zwiększyć jego wartość.
   <br> Zmniejszanie wartości zrób inlineowo, w szablonie.
   <br> Użyj modyfikatora `.prevent` aby zapobiedz przekierowaniu na kliknięcie.
3. Dodaj pole `product` do data, możesz je skopiować z `snippets/products.json`.
   <br> Wyświetl te pola na jego podstawie: `name, photo, description, price, department`.
   <br> Dodaj `v-model` do następujących pól: `name, photo, description, price, inStock, color`.
   <br> Dodaj `v-model` do `materials`, możesz użyć `materials-v-model.html` żeby nie pisać tak dużo.
   <br> Dodaj `v-model` do `department`.
   <br> Dodaj modyfikatory:
   * `number` do `price` i `inStock`
   * `trim` do `name`, `color` i `photo`
   * `lazy` do `photo`
4. Dodaj `v-if` do wyświetlania `inStock` opisowo - out of stock / few in stock / plenty in stock
   <br> Dodaj `span.lozenge` z tekstem "free shipping" gdy `price ` jest < $20.
   <br> Schowaj stopkę produktu i wyświetl `span.lozenge` "out of stock" gdy `quantity` == 0.
   <br> Zamień "free shipping" na v-show.
5. Użyj range `v-for` do wyświetlenia większej ilości produktów.
   <br> Wyświetl licznik przed nazwą produktu
   <br> Użyj operatora `?:` aby zapenić, że `page` >= 0
6. Wyświetl pole `materials` w pętli `v-for`.
   <br> Dodaj pole `products` do data, znajdziesz je w `snippets/products.json`.
   <br> Wyświetl produktu na podstawie tego pola zamiast `v-for`.
7. Dodaj klasę `highlight` do produktu gdy `price` < 300.
   <br> Podepnij `style` pod kolory.
8. Zamiast `v-if` użyj metody `describeQuantity` aby zwrócić teskt opisujący `inStock`.
   <br> Zamień metodę na computed propery - `quantityDescription`.
   <br> Zamień `product` tak, żeby był pobierany z tablicy lub był pustym obiektem gdy ta jest pusta.
9. Przenieś obsługę zdarzenia kliknięcia poprzedniej strony do metody `onClickPrevious`
   <br> Dodaj `watch` pola `page` i pobieraj produkty dla zadanej strony za pomocą `fetchProducts` z serwisu gdy się zmienia.
   <br> Wydziel pobieranie do metody `reloadProducts` i użyj jej zarówno w `watch`, jak i `created`.
   <br> Dodaj pole `isLoading` i użyj go, żeby pokazać i chować `.spinner` w zależności od stanu ładowania.
10. Dodaj globalny filtr `asCurrency` i użyj go w komponencie.
11. Dodaj globalną dyrektywę `style-when-broken` i użyj jej na obrazkach. Powinna ona dodawać klasę `broken-image` do obrazka na `onerror` jego ładowania.
12. Wydziel navbar do osobnego komponetu - pamiętaj o przeniesieniu `data` oraz wyekstraktowaniu styli ze `style.scss`.
13. Wydziel listę produktów do komponentu `ProductsList` przekazując mu wszystko, czego potrzebuje jako propsy.
    <br> Wydziel pojedyńczy element list do komponentu `ProductsListItem` przekazując mu produkt jako props.
    <br> Wydziel szczegóły produktu do komponentu `ProductDetails` przekazując mu produkt jako props z domyślną wartością będącą pustym obiektem. Pamiętaj o przeniesieniu `quantityDescription`.
    <br> Przenieś odpowiednie style do nowych komponentów.
14. Zainstaluj `vuelidate` i użyj go w aplikacji - najpierw `import`, a potem `Vue.use`
    <br> Wydziel komponent `ProductForm` i przekaż mu `product` jako propsa. Pamiętaj o stylach.
    <br> W funkcji data skopiuj każde pole produktu do pola komponentu - kod znajdziesz w `snippets/product-form.js`.
    <br> Dodaj również watcher na `product` i skopiuj w nim dane do formularza edycji - kod znajdziesz w `snippets/product-form.js`.
    <br> Zaimportuj validatory `required` oraz `numeric` z `vuelidate/lib/validators`.
    <br> Dodaj jako pole obiekt `validators`, którego kluczami są nazwy pól danych, a wartościami obiekty z validatorami - kod znajdziesz w `snippets/product-form.js`.
    <br> Do każdego pola dodaj handler change lub input `$v.nazwaPola.$touch()` - dla materials znajdziesz kod w `snippets/materials-v-model.html`.
    <br> Status formularza jest dostępny w `$v.$invalid`. Użyj tego, aby pokazać `.lozenge` z informacją o błędach w formularzu i wyłączyć przycisk.
15. Zainstaluj `vue-router` i użyj go w aplikacji - najpierw `import`, a potem `Vue.use`.
    <br> Dodaj do aplikacji prosty router mapujący `/` na `ProductsList`.
    <br> W `App` wyświetl `router-view` i usuń pozostałe komponenty oprócz navbara.
    <br> Całą logikę i pola przenieś do `ProductsList`. Pamiętaj, aby eventy zmienić na metody itp.
    <br> Dodaj `router-link` w navbarze.
16. Dodaj routey dla podglądu i edycji produktu przyjmujące parametr `id`.
	<br> Przekaż `id` za pomocą propsów - skonwertuj string na liczbę.
	<br> W `ProductsListItem` dodaj `router-link` do nowego urla
	<br> W `ProductDetails` dodaj pobieranie danych za pomocą `getProductById` z serwisu. Obsłuż przypadki, gdy produkt się ładuje (flaga `isLoading` + `.spinner`) oraz gdy wystąpi błąd ładowania danych (flaga `isError` + `.lozenge` i tekst). Pamiętaj o tym, aby odświeżać dane również, gdy `id` się zmieni.
	<br> W `ProductDetails` dodaj `router-link` do nowego urla
	<br> W `ProductForm` dodaj pobieranie danych za pomocą `getProductById` z serwisu. Obsłuż przypadki, gdy produkt się ładuje (flaga `isLoading` + `.spinner`) oraz gdy wystąpi błąd ładowania danych (flaga `isError` + `.lozenge` i tekst). Pamiętaj o tym, aby odświeżać dane również, gdy `id` się zmieni i ponownie kopiować pola produktu.
17. W `ProductsList` pobieraj numer strony z query stringa (`page`). Przekazuj go jako props z routera, konwertując do liczby z wartością domyślną 1.
	<br> Linki stronicowania zamień na `router-link` i zamień `to` na notację obiektową, chowaj je gdy strona jest ostatnia lub pierwsza
	<br> Pokaż listę tylko jeśli zawiera elmenty, w innym wypadku wyświetl komunikat o pustej stronie.
18. Dodaj metodę `saveProduct` do `ProductForm`, która wyśle produkt na serwer z pomocą `updateProduct` z serwisu. Obsłuż błąd `saveError`.
	<br> Po udanym zapisie przekieruj na `ProductDetails` z pomocą `this.$router`.
19. Zainstaluj `vuex`.
	<br> Stwórz prosty `store`, który w stanie przechowuje `products` i ma getter do ich pobrania oraz akcję + mutację do ich zmiany - `updateProducts`.
	<br> Użyj `mapGetters` i `mapActions` w `ProductsList` aby pobierać informacje tego stora.
20. Zainstaluj `vue-router-sync` i zsynchronizuj nim store i router za pomocą funkcji `sync`.
	<br> Dodaj getter `currentPageNumber` i użyj go zamiast propsa w komponencie `ProductsList`
21. Dodaj akcję `fetchProducts` do stora, a do stanu obiekt `productsStatus` z flagami `error` i `loading` .
	<br> Użyj akcji zamiast metody w`ProductsList`.
	<br> Stan ładowania i błędu również pobierz ze stora.
22. Do stora dodaj getter `currentProductId` pobierający liczbę z routera.
	<br> Dodaj getter `currentProduct`, który zwraca znaleziony w `products` element z tym samym id.
	<br> Dodaj mutację `updateOrAddProduct`, która albo zaktualizuje istniejący w tablicy produkt, albo doda nowy na jej końcu. Dodaj taką samą akcję.
	<br> Dodaj pole + getter `currentProductStatus` oraz mutację `changeCurrentProductStatus`.
	<br> Dodaj akcję `fetchCurrentProduct`, która pobierze produkt i wywoła `updateOrAddProduct` dbając przy tym o 'currentProductStatus'.
	<br> Użyj nowych elementów stora w `ProductDetails`, usuwając przy tym propsy.
23. Dodaj akcję `saveProduct` oraz pole `saveProductStatus` wraz z odpowiednim getterem i mutacją.
    <br> Użyj nowej akcji w `ProductForm` zmieniając metodę na `submit`.
    <br> Przekierowanie obsłuż za pomocą zwróconego promisa. W środku `then` możesz sprawdzić status formularza.
24. Stwórz plik `ProductsListItem/ProductsListItem.js` oraz 'ProductsListItem/ProductsListItem.scss'.
	<br> Style z `ProductsListItem.vue` przenieś do pliku scss, skrypt do `ProductsListItem.js`.
	<br> Dodaj pole `functional` o wartości `true`.
	<br> Dodaj `render` z parameterm `h` i obiektem `context` jako drugim.
	<br> Skonwertuj template na JSX - `v-if` zamień na `:?`, a wszystkie odniesienia do zmiennych poprzedź `context.props`.
	<br> Podwójne wąsy zamień na pojedyńcze.
	<br> Pomiń użycie filtra asCurrency, dodamy go potem.
	<br> Zmień wszystkie dynamicznie bindowane atrybuty na wywołania JSX atrybut={zmienne}.
25. Definicję dyrektywy i filtru wydziel do osobnych plików w odpowiednich folderach.
	<br> Ze stora wyeksportuj również sam obiekt opcji.
	<br> Router wydziel do osobnego pliku, domyślnie eksportując gotowy obiekt, ale również same opcje.
26. Zobacz jakie testy są dostępne w katalogu test, uruchom je i popraw jeśli to konieczne.
  <br> Dodaj testy poszczególnych elementów aplikacji - mutacji, getterów, akcji, komponentów.
