#!/usr/bin/env node

import { program } from 'commander';

import { watch } from './cmd/watch';
import { list } from './cmd/list';

program
  .command('watch')
  .option('-c, --charactor-id <number>', 'voice charactor id', '3')
  .action((params, options, command) => {
    watch(params);
  });

program.command('list').action(() => {
  list();
});

program.parse();
