import { describe, expect, it } from '@jest/globals';
import * as funcs from '../index.js';
import _ from 'lodash';
import { mkdir, mkfile } from '@hexlet/immutable-fs-trees';

describe('task1', () => {
  it('should be immutable', () => {
    const tree = mkdir('/', [
      mkdir('eTc', [mkdir('NgiNx'), mkdir('CONSUL', [mkfile('config.json')])]),
      mkfile('hOsts.tXt'),
    ]);
    const original = _.cloneDeep(tree);

    funcs.upcaseFileNames(tree);

    expect(tree).toEqual(original);
  });
  it('should work', () => {
    const tree = mkdir('/', [
      mkdir('eTc', [mkdir('NgiNx'), mkdir('CONSUL', [mkfile('config.JSON')])]),
      mkfile('hOsts.tXt'),
    ]);
    const actual = funcs.upcaseFileNames(tree);

    const expected = {
      children: [
        {
          children: [
            {
              name: 'NgiNx',
            },
            {
              children: [{ name: 'CONFIG.json' }],
              name: 'CONSUL',
            },
          ],
          name: 'eTc',
        },
        { name: 'HOSTS.txt' },
      ],
      name: '/',
    };

    expect(actual).toMatchObject(expected);
  });
});

describe('task2', () => {
  const tree1 = mkdir('/', [
    mkdir('etc', [
      mkdir('apache'),
      mkdir('nginx', [mkfile('.nginx.conf', { size: 800 })]),
      mkdir('.consul', [
        mkfile('.config.json', { size: 1200 }),
        mkfile('data', { size: 8200 }),
        mkfile('raft', { size: 80 }),
      ]),
    ]),
    mkfile('.hosts', { size: 3500 }),
    mkfile('resolve', { size: 1000 }),
  ]);

  const tree2 = mkdir('/', [
    mkdir('etc', [
      mkdir('apache'),
      mkdir('nginx', [mkfile('.nginx.conf', { size: 800 })]),
      mkdir(
        '.consul',
        [
          mkfile('.config.json', { size: 1200 }),
          mkfile('data'),
          mkfile('raft', { size: 80 }),
        ],
        { size: 4700 },
      ),
    ]),
    mkfile('.hosts', { size: 3500 }),
    mkfile('resolve', { size: 1000 }),
  ]);

  it('should work', () => {
    expect(funcs.countFilesWeight(tree1)).toEqual(14780);
  });
  it('should work', () => {
    expect(funcs.countFilesWeight(tree2)).toEqual(10000);
  });
});

describe('task3', () => {
  it('should return undefined', () => {
    expect(funcs.countDirs()).toBeUndefined();
  });

  const tree = mkdir('/', [
    mkdir('etc', [
      mkdir('apache'),
      mkdir('nginx', [mkfile('nginx.conf')]),
      mkdir('consul', [mkfile('config.json'), mkdir('data')]),
    ]),
    mkdir('logs'),
    mkfile('hosts'),
  ]);

  it('should work', () => {
    expect(funcs.countDirs(tree)).toEqual({
      empty: ['apache', 'data', 'logs'],
      hasChildren: ['etc', 'nginx', 'consul'],
    });
  });
});

describe('task4', () => {
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

  const result = {
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
            children: [
              {
                name: 'article',
                type: 'tag-internal',
                className: 'article',
                children: [],
              },
            ],
          },
          {
            name: 'div',
            type: 'tag-internal',
            className: 'column',
            children: [
              {
                name: 'article',
                type: 'tag-internal',
                className: 'article',
                children: [],
              },
            ],
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

  it('should return undefined', () => {
    expect(funcs.addInternalElement()).toBeUndefined();
  });
  it('should work', () => {
    expect(funcs.addInternalElement(tree)).toEqual(result);
  });
});

describe('task5', () => {
  it('should not count', () => {
    expect(funcs.filterTree()).toBeUndefined();
  });

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

  const result = {
    name: 'div',
    type: 'tag-internal',
    className: 'hexlet-community',
    children: [
      {
        name: 'div',
        type: 'tag-internal',
        className: 'someAnotherClass',
        children: [
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

  it('should work', () => {
    expect(funcs.filterTree(tree, 'someClass')).toEqual(result);
  });
});
