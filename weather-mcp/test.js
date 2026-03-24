import { exec } from 'child_process';

exec('ls -l', (error, stdout, stderr) => {
  if (error) {
    console.error(`执行错误: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`命令错误输出: ${stderr}`);
    return;
  }
  console.log(`命令输出:\n${stdout}`);
});
