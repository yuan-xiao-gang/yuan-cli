#!/usr/bin/env node

const { Command } = require("commander"); // 处理用户输入命令

const handleSomeAnswers = require("./answers");

const packageInfo = require('../package.json');


const program = new Command();

program.version(`${packageInfo.version}`);

program.option("-i, init [name]", "初始化项目").action((res) => {
  // 处理交互的问题
  handleSomeAnswers(res.args[1]);
});

program.parse(process.argv);
