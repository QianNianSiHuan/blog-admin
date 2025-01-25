const fs = require('fs');
const dotenv = require('dotenv'); // 加载 .env 文件中的环境变量
const dayjs = require('dayjs');

const versionInfoPath = 'versionInfo.json'; // 版本信息路径
const pagePath = 'package.json';
const publicPath = 'public'; // 存放于 public 目录
const autoPush = false; // 是否自动提交 Git
const isVite = true; // 是否使用 Vite 构建

let pageInfo = {};
let versionInfoObj = {}; // 存储版本信息

// 读取现有版本信息
if (fs.existsSync(versionInfoPath)) {
    versionInfoObj = JSON.parse(fs.readFileSync(versionInfoPath).toString());
}

// 读取 package.json 中的版本号
if (fs.existsSync(pagePath)) {
    pageInfo = JSON.parse(fs.readFileSync(pagePath).toString());
}

// 判断版本是否已存在
if (pageInfo && versionInfoObj.version === pageInfo.version) {
    console.warn('警告: 当前版本信息已存在！\n');
} else {
    versionInfoObj = {
        version: pageInfo.version,
        name: pageInfo.name,
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };
    fs.writeFileSync(versionInfoPath, JSON.stringify(versionInfoObj, null, 2));
    console.log(`执行成功: 文件地址为 ${process.cwd()}/${versionInfoPath}\n`);
}

// 将 versionInfo 文件移至 public 目录
if (fs.existsSync(publicPath)) {
    fs.writeFileSync(`${process.cwd()}/${publicPath}/${versionInfoPath}`, fs.readFileSync(versionInfoPath));
}

// 更新 .env 文件中的 VITE_GIT_INFO 变量
if (isVite) {
    const envPath = `${process.cwd()}/.env`;
    const envContent = fs.readFileSync(envPath, {encoding: 'utf-8'});
    const envVariables = dotenv.parse(envContent);
    envVariables.VITE_GIT_INFO = JSON.stringify(versionInfoObj);
    const updatedEnvContent = Object.entries(envVariables)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');
    fs.writeFileSync(envPath, updatedEnvContent, {encoding: 'utf-8'});
    console.log('.env 文件已更新');
}
