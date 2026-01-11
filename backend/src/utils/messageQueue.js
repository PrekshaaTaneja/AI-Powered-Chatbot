const queue = [];
let isProcessing = false;

const addToQueue = async (task) => {
  queue.push(task);
  processQueue();
};

const processQueue = async () => {
  if (isProcessing || queue.length === 0) return;

  isProcessing = true;
  const task = queue.shift();

  try {
    await task();
  } catch (error) {
    console.error("Queue task failed:", error);
  } finally {
    isProcessing = false;
    processQueue();
  }
};

module.exports = { addToQueue };
