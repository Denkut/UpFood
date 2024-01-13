Области хранения данных:

-   база данныхна json-server
-   BFF
-   Redux-store

Сущности приложения:

-   пользователь: БД (список пользователей), BFF (сессия текущего пользователя), redux-store (отображение в браузере)
-   роль пользователя: БД (список ролей), BFF (сессия пользователя), redux-store (использование на клиенте роли пользователя)
-   рационы: БД (список рационов), redux-store (отображение в браузере)
-   блюда: БД (список блюд), redux-store (отображение в браузере)

Таблицы БД:

-   Пользователи - users: id / login / password / registreed_at / role_id / age / weight / height / fitnessGoals / dietPreferences / allergies
-   роли - roles: id / name
-   рационы - rations: id / title / total_callories / fitnessGoal / meals / image_url / content / price
-   блюда - meals: id / name / image_url / type / calories / suitableFor / dietCategories / ingredients / price

Схема состояния на BFF:

-   сессия текущего пользователя: login / password / role

Схема для Redux-store (на клиенте):

-   user: id / login / roleId / session / age / weight / height / fitnessGoals / dietPreferences / allergies /
-   users: массив user: id / login / registeredAt / role
-   meal: id / title / imageUrl / content / type / calories / suitableFor / dietCategories / ingredients / price
-   meals: массив meal / id / title / imageUrl / content / type / calories / suitableFor / dietCategories / ingredients / price
-   ration: массив meal: id / title / imageUrl / content / totalCalories / fitnessGoal / price
-   rations: массив ration: id / title / imageUrl / content / totalCalories / fitnessGoal / price
