Проект Todo.

Что сделать, чтобы проект заработал?

1. Создать js-файл с названием api с расширением .mjs в папке js.
2. В созданном файле добавить две переменные по примеру ниже:

Пример:

export const projectSecret = "";
export const name_db = "";

3. Создать проект в mockapi.io и скопировать project secret, а затем вставить в переменную projectSecret
4. В созданном проекте (в mockapi.io) добавить базу данных с 3 полями:
- id
- completed
- title

5. Название базы данных скопировать и вставить в переменную name_db.
6. Можно запустить проект через браузер.

* Не забудь сделать npm install