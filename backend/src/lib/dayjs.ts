import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/pt-br"; // import the locale for dayjs

dayjs.locale("pt-br"); // set the locale for dayjs
dayjs.extend(localizedFormat); // extend dayjs with localizedFormat plugin

export { dayjs }; // export the dayjs instance