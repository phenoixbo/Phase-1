const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');
const { CronJob } = require('cron');

const createTimestampedBackupFolder = (backupLocation) => {
  const timestamp = new Date().toISOString().replace(/:/g, '-');
  const backupFolder = path.join(backupLocation, `backup_${timestamp}`);
  fs.mkdirSync(backupFolder, { recursive: true });

  return backupFolder;
};
const logBackup = (message) => {
  const logFile = path.join(__dirname, 'backup.log');
  const logMessage = `[${new Date().toISOString()}] ${message}\n`;
  fs.appendFileSync(logFile, logMessage);
};
const performBackup = (sourceDir, backupLocation) => {
  try {
    if (!fs.existsSync(sourceDir)) {
      logBackup(`Source directory ${sourceDir} does not exist.`);
      console.error(`Source directory ${sourceDir} does not exist.`);
      return;
    }
    if (!fs.existsSync(backupLocation)) {
      logBackup(`Backup directory ${backupLocation} does not exist. Creating it now.`);
      fs.mkdirSync(backupLocation, { recursive: true });
    }

    const backupFolder = createTimestampedBackupFolder(backupLocation);
    fs.copySync(sourceDir, backupFolder);
    logBackup(`Backup successful from ${sourceDir} to ${backupFolder}`);
    compressBackup(backupFolder);

  } catch (error) {
    logBackup(`Error during backup: ${error.message}`);
    console.error(`Backup failed: ${error.message}`);
  }
};
const compressBackup = (backupFolder) => {
  const output = fs.createWriteStream(`${backupFolder}.zip`);
  const archive = archiver('zip', { zlib: { level: 9 } });

  archive.pipe(output);
  archive.directory(backupFolder, false);
  archive.finalize();

  output.on('close', () => {
    logBackup(`Backup compressed into ${backupFolder}.zip`);
    fs.removeSync(backupFolder);
  });
};
const scheduleBackup = (sourceDir, backupLocation, cronTime) => {
  new CronJob(cronTime, () => {
    console.log('Running scheduled backup...');
    performBackup(sourceDir, backupLocation);
  }, null, true, 'America/Los_Angeles');
};
const cleanUpBackups = (backupLocation, maxBackups) => {
  try {
    const backups = fs.readdirSync(backupLocation)
      .filter(file => file.startsWith('backup_'))
      .map(file => path.join(backupLocation, file));
    backups.sort((a, b) => fs.statSync(b).mtime - fs.statSync(a).mtime);
    backups.slice(maxBackups).forEach(backup => fs.removeSync(backup));
    logBackup(`Cleaned up backups, keeping the latest ${maxBackups}`);
  } catch (error) {
    logBackup(`Error cleaning up backups: ${error.message}`);
    console.error(`Cleanup failed: ${error.message}`);
  }
};
const oneTimeBackup = (sourceDir, backupLocation) => {
  performBackup(sourceDir, backupLocation);
};
const main = () => {
  const sourceDir = path.join(__dirname, 'source'); 
  const backupLocation = path.join(__dirname, 'backups'); 
  const cronTime = '0 0 * * *'; 
  oneTimeBackup(sourceDir, backupLocation);
  scheduleBackup(sourceDir, backupLocation, cronTime);
  cleanUpBackups(backupLocation, 3);
};
main();
