<h1 align="center">Учебный проект: "Stellar Burgers"</h1>

<div align="center">
  <img width="575" alt="Основной функционал приложения" src="https://github.com/elrouss/react-burger/assets/108838349/366eb98b-23b7-4409-954e-769d97b649b1">
</div>

<a name="summary">
  <details>
    <summary>Оглавление</summary>
    <ol>
      <li><a href="#project-description">Описание проекта</a></li>
      <li><a href="#technologies">Стек технологий</a></li>
      <li><a href="#installation">Установка и запуск приложения в локальном репозитории</a></li>
      <li><a href="#establishing">Процесс создания</a></li>
      <li><a href="#functionality">Функционал</a></li>
      <li><a href="#enhancement">Статус</a></li>
    </ol>
  </details>
</a>

<a name="project-description"><h2>1. Описание проекта</h2></a>
"Stellar Burgers" - приложение (SPA) с регистрацией и авторизацией пользователей, в котором можно собрать и заказать свой личный бургер (без доставки на дом). Выполнен в рамках углубленной образовательной программы по библиотеке "React" <a href="https://practicum.yandex.ru/">Яндекс Практикума</a>.

<b>Ссылки на проект</b>
<br>
<b>Макет:</b>
<br>https://www.figma.com/file/zFGN2O5xktHl9VmoOieq5E/React-_-%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%BD%D1%8B%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D1%87%D0%B8_external_link?node-id=0%3A1
<br>
<b>Чек-листы</b>:
<br>https://code.s3.yandex.net/react/checklists-pdf/checklist-1.pdf
<br>https://code.s3.yandex.net/react/checklists-pdf/checklist-2.pdf
<br>

<i>* - проект прошел код-ревью</i>

<div align="right">(<a href="#summary">к оглавлению</a>)</div>

<a name="technologies"><h2>2. Стек технологий</h2></a>
<span>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="Иконка React">
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="Иконка React Router">
  <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" alt="Иконка Redux">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="Иконка 'TypeScript'">
  <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" alt="Иконка 'Sass (SCSS)'">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="Иконка HTML5">
</span>

<div align="right">(<a href="#summary">к оглавлению</a>)</div>

<a name="installation"><h2>3. Установка и запуск приложения в локальном репозитории</h2></a>
1. `git clone https://github.com/elrouss/react-burger.git` - клонировать репозиторий (HTTPS)
2. `npm i` - установить зависимости (предварительно проверить наличие Node.js командой `node -v`, а также - NPM командой `npm -v`; в случае необходимости скачать и установить Node.js по этой <a href="https://nodejs.org/en/download">ссылке</a>)
3. `npm run start` - запустить приложение

<div align="right">(<a href="#summary">к оглавлению</a>)</div>

<a name="establishing"><h2>4. Процесс создания</h2></a>
Работа разделена на <b>6 этапов</b>. Выполнены следующие:
<br>
1. Верстка на десктоп (`1920px`);
2. Перенос проекта на Redux Toolkit и написание бизнес-логики (см. функционал)
3. Добавление роутов
4. Переписывание проекта на TypeScript

<div align="right">(<a href="#summary">к оглавлению</a>)</div>

<a name="functionality"><h2>5. Функционал</h2></a>
- Регистрация и авторизация пользователей, восстановление пароля
- Редактирование личных данных
- Drag and Drop (перенос ингредиентов в конструктор с возможностью внутренней сортировки и удаления ненужных)
- Счетчики ингредиентов и цены
- Подсветка активных табов в списке ингредиентов при скролле
- Открытие и закрытие модальных окон по кнопке, оверлею и клавише `Escape` с сохранением открытого состояния после обновления страницы (также открытие информации об ингредиенте на отдельной странице при копировании ссылки в адресную строку новой вкладки/нового окна браузера)

<div align="right">(<a href="#summary">к оглавлению</a>)</div>

<a name="enhancement"><h2>6. Статус</h2></a>
На этапе разработки

Требуется улучшить:
- Выведение ошибок с сервера под инпутами в формах
- Оптимизация ререндеров (на данном этапе функционал компонентов постоянно меняется, поэтому логично выполнить задачу на финальном этапе проекта)

<div align="right">(<a href="#summary">к оглавлению</a>)</div>
