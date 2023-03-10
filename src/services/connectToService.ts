export const connectToService = async (callback: () => Promise<any>) => {
  let retries = 5;
  while (retries) {
    try {
      await callback();
      break;
    } catch (err) {
      retries -= 1;
      console.log(`retries left: ${retries}`);

      // wait 5 seconds before another connection attempt
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
};
