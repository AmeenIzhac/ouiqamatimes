data = """
Feb 01  Sat  07:00	07:44  12:30   15:30   16:55   18:45	
Feb 02  Sun  07:00	07:42  12:30   15:30   16:57   18:45
Feb 03  Mon  07:00	07:41  12:30   15:30   16:59   18:45
Feb 04  Tue  07:00	07:39  12:30   15:30   17:01   18:45
Feb 05  Wed  07:00	07:37  12:30   15:30   17:03   18:45
Feb 06  Thu  07:00	07:36  12:30   15:30   17:04   18:45
Feb 07  Fri  06:45	07:34  12:30   15:45   17:06   19:00	
Feb 08  Sat  06:45	07:32  12:30   15:45   17:08   19:00
Feb 09  Sun  06:45	07:30  12:30   15:45   17:10   19:00
Feb 10  Mon  06:45	07:29  12:30   15:45   17:12   19:00
Feb 11  Tue  06:45	07:27  12:30   15:45   17:14   19:00
Feb 12  Wed  06:45	07:25  12:30   15:45   17:15   19:00
Feb 13  Thu  06:45	07:23  12:30   15:45   17:17   19:00
Feb 14  Fri  06:30	07:21  12:30   15:45   17:19   19:15	
Feb 15  Sat  06:30	07:19  12:30   15:45   17:21   19:15
Feb 16  Sun  06:30	07:17  12:30   15:45   17:23   19:15
Feb 17  Mon  06:30	07:15  12:30   15:45   17:25   19:15
Feb 18  Tue  06:30	07:13  12:30   15:45   17:27   19:15
Feb 19  Wed  06:30	07:11  12:30   15:45   17:28   19:15
Feb 20  Thu  06:30	07:09  12:30   15:45   17:30   19:15
Feb 21  Fri  06:15	07:07  12:30   16:00   17:32   19:30	
Feb 22  Sat  06:15	07:05  12:30   16:00   17:34   19:30
Feb 23  Sun  06:15	07:03  12:30   16:00   17:36   19:30
Feb 24  Mon  06:15	07:01  12:30   16:00   17:37   19:30
Feb 25  Tue  06:15	06:59  12:30   16:00   17:39   19:30
Feb 26  Wed  06:15	06:57  12:30   16:00   17:41   19:30
Feb 27  Thu  06:15	06:55  12:30   16:00   17:43   19:30
Feb 28  Fri  06:15	06:52  12:30   16:15   17:45   20:00
"""


prayer_times = {}

month_map = {"Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06",
             "Jul": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"}

for line in data.strip().split("\n"):
    parts = line.split()
    month = month_map[parts[0]]
    day_of_month = parts[1]
    ddmm_key = f"{day_of_month}{month}"

    times = {
        "Fajr": parts[3],
        "Sunrise": parts[4],
        "Dhuhr": parts[5],
        "Asr": parts[6],
        "Maghrib": parts[7],
        "Isha": parts[8]
    }
    prayer_times[ddmm_key] = times

import json

with open("src/prayer_times.json", "w") as json_file:
    json.dump(prayer_times, json_file, indent=4)
