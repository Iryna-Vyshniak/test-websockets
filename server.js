/* 1. Запуск сервера
    - установить и настроить nodejs
    - установить и настроить websocket
    - установить и настроить sqlite

2. Интерфейс
    - используя react, react-dom создать web приложение
    - создать страницу DesktopPage:
        function DesktopPage(props) {
            const [data, setData] = useState([]);

            useEffect(() => {
                ...
            });

            return (
                <Row>
                    <Card
                        ...
                    />
                    <Button
                        text="Add"
                        ...
                    />
                </Row>
            );
        }
    - при нажатии на кнопку "Add" открыть Popup окно
    - Popup:
        - поле ввода имени (input name)
        - поле ввода организации (input orgName)
        - кнопка OK -> создать файл базы данных orgName.sqlite с таблицей info (name, orgname, datecreate)
        - кнопка Cancel
    - Card:
        - header  -> name
        - content -> orgName
        - onClick -> перейти на страницу OrgPage -> вывод информации из таблицы info
                                                 -> кнопка settings (открыть Popup окно с редактированием name)

3. Компановка
    - проект упаковать с помощью webpack

4. Структура проекта
    testpro --
             - build
             - src   --
                      - jsx      --
                                  - DesktopPage.jsx
                                  - main.jsx
                                  - ...
                      - scss     --
                                  - colors.scss
                                  - main.scss
                                  - ...
                      - index.js
                      - webpack.config.js
                      - ...
             - ...
 */
