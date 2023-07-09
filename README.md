# Kanbangular
Klon Jiry napisany w Angularze z wykorzystaniem Firebase jako backendu


## Poziomy dostępu użytkownika
W aplikacji są trzy poziomy dostępu
"developer" - ma mozliwość tworzyć i zarządzać taskami oraz funkcjonalnościami(feature) w projektach do których został dodany
"devops" - ma możliwość tworzenia oraz edycji projektów oraz zarządzania dostępami developerów do projektów
"admin" - oprócz powyższego może też zarządzać samymi użytkownikami.

## Nawigacja

Po otworzeniu strony w przeglądarce niezalogowany użytkownik widzi dwie opcje

![nav_niezalogowany](https://github.com/Kejom/kanbangular/assets/44144231/7c47ca47-1109-4a16-a13c-f81e5c638098)

"Login" Pozwalająca się na zalogowanie do aplikacji

![login](https://github.com/Kejom/kanbangular/assets/44144231/dd05b7f6-34be-4a64-ad8b-71a82743e16d)

"Register" Pozwalająca na utworzenie nowego konta

![register](https://github.com/Kejom/kanbangular/assets/44144231/68c8537d-d6c1-4f7a-9c2a-421886f5e229)

Po zalogowaniu użytkownik ma dostęp do następujących opcji

![nav_zalogowany](https://github.com/Kejom/kanbangular/assets/44144231/ebfedbc9-c4c0-47ec-9b5f-eb4be9399269)

"Nazwa aktualnie wybranego projektu" + "Board" widoczna tylko jesli aktualnie został wybrany jakis project, odnośnik poprowadzi użytkownika bezpośrednio do głównej tablicy projektu

"Projects" miejsce w którym użytkownik widzi projekty do których ma dostęp oraz może wybrać ten w którym aktualnie chce pracować.

"Manage Users" widoczna tylko dla admina opcja która pozwala na zarządzanie kontami użytkowników

## Projects

Na tym ekranie użytkownicy z rolą "developer" zobaczą projekty do których mają dostęp, użytkownicy z rolami "devops" albo "admin" zobaczą wszystkie projekty oraz będą mieli możliwość zarządzania nimi oraz dodania nowego projektu.

![projects_lista](https://github.com/Kejom/kanbangular/assets/44144231/bddf16fd-24af-49ec-92e9-7cb27f31a697)

Tab "Add New Project" jest widoczny tylko dla użytkowników z rolą "devops" olbo "admin

![projects_nowy](https://github.com/Kejom/kanbangular/assets/44144231/f0486975-052f-4674-a767-7ddb9f28e20b)

## Manage Users

Strona dostępna tylko dla użytkowników z rolą "admin" pozwala na zarządzanie użytkownikami.

![manage_users](https://github.com/Kejom/kanbangular/assets/44144231/14df4c44-2cc9-4185-b796-82164beb27ef)

Kliknięcie "Edit" obok wybranego użytkownika otwiera strone jego edycji.

![user_edit](https://github.com/Kejom/kanbangular/assets/44144231/39440c8a-6267-4929-9792-b51560e58c9b)

## Strona Projektu

Strona z wszystkimi informacjami Projektu. Zawiera cztery główne sekcje

![project_tabs](https://github.com/Kejom/kanbangular/assets/44144231/53b67991-4749-473b-8377-89807acc79b7)

"Features" zarządzanie funkcjonalnościami
"Tasks" tablica kanban projektu + zarządzanie taskami
"Edit Project" edycja ustawien projektu, widoczna tylko dla użytkowników z rolą "devops" albo "admin"
"Manage Access" zarządzanie użytkownikami którzy mają dostęp do projektów, widoczna tylko dla użytkowników z rolą "devops" albo "admin"

## Features

Ta sekcja zawiera listę wszystkich funkcjonalności stworzonych dla danego projektu

![feature_list](https://github.com/Kejom/kanbangular/assets/44144231/e5c75cca-9238-40c4-8380-588ca658668e)

kliknięcie "Create new Feature" przełączna widok na formularz do tworzenia nowej funkcjonalności

![feature_new](https://github.com/Kejom/kanbangular/assets/44144231/29ef8250-89e1-4115-a627-34d35e77341e)

kliknięcie "Open" na funkcjonalności która nas interesuje otwiera jej stronę

![feature](https://github.com/Kejom/kanbangular/assets/44144231/794e1fd6-210d-4bc2-8a06-a71e606e3c90)

strona to oprócz danych samej funkcjonalności zawiera też listę powiązanych tasków oraz formularz do dodania nowego tasku który zostanie automatycznie powiązany z funkcjonalnością

![feature_newTask](https://github.com/Kejom/kanbangular/assets/44144231/208cfbea-e0d4-4c82-bc30-3be7226cef7c)

## Tasks

Ta sekcja zawiera tablice Kanban zawierającą wszystkie taski powiązane z projektem. Taski można filtrować po użytkownikach(dropdown w prawym górnym rogu) albo tytułach (input w lewym górnym rogu).
Możliwe jest też przeciąganie tasków pomiędzy kolumnami w celu zmiany statusu.

![kanban_board](https://github.com/Kejom/kanbangular/assets/44144231/adcc4404-54ca-4337-b48a-dbfea90cda30)

"Create new Task" zawiera formularz do tworzenia nowych tasków o identycznym wyglądzie jak ten zawarty na stronie funkcjonalności, jedyną różnicą jest możliwość wybrania funkcjonalności do której Task zostanie przypisany.

Kliknięcie "Open" otworzy strone edycji Taska pozwalająca na jego edycje.

![task_page](https://github.com/Kejom/kanbangular/assets/44144231/5db4bd4a-6f73-4c46-a0df-2cbaa9aeebb0)

## Edit Project

Ta sekcja pozwala na edycje danych projektu, jest widoczna tylko dla użytkowników z rolą "devops" albo "admin"

![edit_project](https://github.com/Kejom/kanbangular/assets/44144231/fb70fcaa-6d37-4cfa-a9ac-a56a462f28cc)

## Manage Access

Podobnie jak Edit Project ta sekcja też jest widoczna tylko dla użytkowników z rolą "devops" albo "admin".
Pozwala na zarządzanie użytkownikami którzy mają dostęp do projektu.

![project_users](https://github.com/Kejom/kanbangular/assets/44144231/f91c6130-0c03-4f3d-ad03-6cf8fa01b9a2)


