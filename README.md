# Практика по деревьям

Перед началом работы ознакомьтесь с мэйкфайлом и заданиями.
Все задания выполняются в index.js и экспортируются не по дефолту.

#### Что проверяет эта практика?
    1. Понимание древовидной структуры объекта
    2. Умение рекурсивно обходить дерево
    3. Практические навыки агрегации по деревьям

### Задание №1

Напишите функцию `upcaseFileNames()`, которая принимает на вход директорию (объект-дерево), приводит имена всех файлов в этой и во всех вложенных директориях к верхнему регистру. Результат в виде обработанной директории возвращается наружу.

**Пример использования**

    ```javascript
    const tree = mkdir('/', [
    mkdir('eTc', [
        mkdir('NgiNx'),
        mkdir('CONSUL', [
            mkfile('config.json'),
        ]),
    ]),
    mkfile('hOsts'),
    ]);

    upcaseFileNames(tree);
    // {
    //   name: '/',
    //   type: 'directory',
    //   meta: {},
    //   children: [
    //     {
    //       name: 'eTc',
    //       type: 'directory',
    //       meta: {},
    //       children: [
    //         {
    //           name: 'NgiNx',
    //           type: 'directory',
    //           meta: {},
    //           children: [],
    //         },
    //         {
    //           name: 'CONSUL',
    //           type: 'directory',
    //           meta: {},
    //           children: [{ name: 'CONFIG.json', type: 'file', meta: {} }],
    //         },
    //       ],
    //     },
    //     { name: 'HOSTS.txt', type: 'file', meta: {}, },
    //   ],
    // }
    ```

### Задание №2

Напишите функцию `countFilesWeight()`, которая подсчитывает общий вес файлов в дереве.  Обратите внимание, что если вес указан у директории, то проходится по файлам и директориям не нужно.

**Пример использования**

    ```javascript
   const tree2 = mkdir('/', [
        mkdir('etc', [
        mkdir('apache'),
        mkdir('nginx', [mkfile('.nginx.conf', { size: 800 })]),
        mkdir('.consul', [
            mkfile('.config.json', { size: 1200 }),
            mkfile('data'),
            mkfile('raft', { size: 80 }),
        ], { size: 4700 }),
        ]),
        mkfile('.hosts', { size: 3500 }),
        mkfile('resolve', { size: 1000 }),
    ]);

    upcaseFileNames(tree) // 10000
    ```


### Задание №3

Напишите функцию `countDirs()`, которая будет аккумулировать количество пустых и непустых директорий в дереве. Функция должна возвращать объект, в котором есть 2 свойства, как в примере

**Пример использования**

    ```javascript
    const tree = mkdir('/', [
        mkdir('etc', [
            mkdir('apache'),
            mkdir('nginx', [
                mkfile('nginx.conf'),
            ]),
            mkdir('consul', [
                mkfile('config.json'),
                mkdir('data'),
            ]),
        ]),
        mkdir('logs'),
        mkfile('hosts'),
    ]);
    countDirs(tree); // { empty: [ 'apache', 'data', 'logs' ], hasChildren: [ 'etc', 'nginx', 'consul' ] }
    ```

### Задание №4

Реализуйте функцию `addInternalElement()`, которая принимает на вход объект-дерево, класс и объект. Функция должна встраивать получаемый объект в массив детей всех элементов по переданному классу. 

**Пример использования**

    ```javascript

    const tree = {
    name: 'body',
    type: 'tag-internal',
    className: 'body',
    children: [
        {
        name: 'header',
        type: 'tag-internal',
        className: 'header',
        children: [],
        },
        {
        name: 'main',
        type: 'tag-internal',
        className: 'main',
        children: [
            {
            name: 'div',
            type: 'tag-internal',
            className: 'column',
            children: [],
            },
            {
            name: 'div',
            type: 'tag-internal',
            className: 'column',
            children: [],
            },
        ],
        },
        {
        name: 'footer',
        type: 'tag-internal',
        className: 'footer',
        children: [],
        },
    ],
    };

    addInternalElement(tree, 'column', {
            name: 'article',
            type: 'tag-internal',
            className: 'article',
            children: [],
            }); 
            // {
            // name: 'body',
            // type: 'tag-internal',
            // className: 'body',
            // children: [
            //     {
            //     name: 'header',
            //     type: 'tag-internal',
            //     className: 'header',
            //     children: [],
            //     },
            //     {
            //     name: 'main',
            //     type: 'tag-internal',
            //     className: 'main',
            //     children: [
            //         {
            //         name: 'div',
            //         type: 'tag-internal',
            //         className: 'column',
            //         children: [{
            //            name: 'article',
            //            type: 'tag-internal',
            //            className: 'article',
            //            children: [],
            //            }],
            //         },
            //         {
            //         name: 'div',
            //         type: 'tag-internal',
            //         className: 'column',
            //         children: [{
            //            name: 'article',
            //            type: 'tag-internal',
            //            className: 'article',
            //            children: [],
            //            }],
            //         },
            //     ],
            //     },
            //     {
            //     name: 'footer',
            //     type: 'tag-internal',
            //     className: 'footer',
            //     children: [],
            //     },
            // ],
            // };
    ```

### Задание №5

Напишите функцию `filterTree()`, которая принимает дерево и класс. Функция должна убирать из дерева все эелементы с этим классом

**Пример использования**

    ```javascript

    const tree = {
    name: 'div',
    type: 'tag-internal',
    className: 'hexlet-community',
    children: [
      {
        name: 'div',
        type: 'tag-internal',
        className: 'someClass',
        children: [],
      },
      {
        name: 'div',
        type: 'tag-internal',
        className: 'someAnotherClass',
        children: [
          {
            name: 'div',
            type: 'tag-internal',
            className: 'someClass',
            children: [],
          },
          {
            name: 'div',
            type: 'tag-internal',
            className: 'someAnotherClass2',
            children: [],
          },
        ],
      },
    ],
  };

    filterTree(tree, 'someClass'); // 
    // {
    //     name: 'div',
    //     type: 'tag-internal',
    //     className: 'hexlet-community',
    //     children: [
    //     {
    //         name: 'div',
    //         type: 'tag-internal',
    //         className: 'someAnotherClass',
    //         children: [
    //         {
    //             name: 'div',
    //             type: 'tag-internal',
    //             className: 'someAnotherClass2',
    //             children: [],
    //         },
    //         ],
    //     },
    //     ],
    // };
    ```
