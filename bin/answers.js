#!/usr/bin/env node


const inquirer = require('inquirer');
const ora = require("ora"); // 小图标
const chalk = require("chalk"); // 改变输出文字颜色
const download = require("download-git-repo"); // 下载git代码
const path = require('path')

const sourcePath = 'yuan-xiao-gang/yuan-cli#develop'; //资源地址

let downPath = ''


const handleSomeAnswers = (name) => {

    const prompts = [];

    if (!name) {
        prompts.push({
            type: 'input',
            name: 'projectName',
            message: '请输入项目名称：',
            validate (input) {
                if (!input) {
                    return '项目名称不能为空！'
                }
                return true
            }
        })
    }

    prompts.push({
        type: 'input',
        name: 'description',
        message: '请输入项目描述信息'
    })

    prompts.push({
        type: 'list',
        message: '请选择要下载的模板',
        name: 'template',
        choices: [
            {
                name: 'pc',
                value: 'pc-master'
            },
            {
                name: 'mobile',
                value: 'mobile-master'
            }
        ]
    })





    console.log('handleSomeAnswers')

    inquirer.prompt(prompts).then(answer => {
        console.log(answer, 'answer')
        const spinner = ora('正在下载资源')
        spinner.start();
        console.log(downPath, 'downPath')


        downPath = path.join(process.cwd(), name)

        download(sourcePath, downPath, { clone:true }, err => {
            if (err) {
                spinner.fail(err)
                console.info(chalk.redBright('下载资源失败'))
                return 
            }
            spinner.color = 'green';
            spinner.succeed('下载成功')
            console.info(chalk.greenBright('下载成功'))
        } )
    })
}

module.exports = handleSomeAnswers