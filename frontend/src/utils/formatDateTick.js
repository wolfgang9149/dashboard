export default function formatDateTick(tickItem) {
    const date = new Date(tickItem);
    const formattedDate = date.toLocaleDateString('en-GB');
    const formattedTime = date.toLocaleTimeString('en-GB');

    return `${formattedTime}`;
  }