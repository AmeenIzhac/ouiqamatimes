# ocis subtract 4 from moonsighting.com dhuhr time
def ocis_dhuhr_adjustment(dhuhr_time):
    hours, minutes = map(int, dhuhr_time.split(':'))
    total_minutes = hours * 60 + minutes - 4
    return f"{total_minutes // 60:02d}:{total_minutes % 60:02d}"

# ocis subtract 2 from moonsighting.com maghrib time
def ocis_mughrib_adjustment(maghrib_time):
    hours, minutes = map(int, maghrib_time.split(':'))
    total_minutes = hours * 60 + minutes - 2
    return f"{total_minutes // 60:02d}:{total_minutes % 60:02d}"



# add 15 minutes then round up to nearest 15 minutes
def fajr_adjustment(fajr_time):
    hours, minutes = map(int, fajr_time.split(':'))
    total_minutes = hours * 60 + minutes + 15
    rounded_minutes = ((total_minutes // 15) * 15) + 15
    return f"{rounded_minutes // 60:02d}:{rounded_minutes % 60:02d}"

# take away 4 mins then if before 12:30 return 12:30 else return 13:30
def dhuhr_adjustment(dhuhr_time):
    hours, minutes = map(int, dhuhr_time.split(':'))
    total_minutes = hours * 60 + minutes
    rounded_minutes = ((total_minutes // 15) * 15) + 15
    dhuhr_time = f"{rounded_minutes // 60:02d}:{rounded_minutes % 60:02d}"
    if dhuhr_time < "12:30":
        return "12:30"
    else:
        return "13:30"

# add 5 minutes then round up to nearest 15 minutes
def asr_adjustment(asr_time):
    hours, minutes = map(int, asr_time.split(':'))
    total_minutes = hours * 60 + minutes + 5
    rounded_minutes = ((total_minutes // 15) * 15) + 15
    return f"{rounded_minutes // 60:02d}:{rounded_minutes % 60:02d}"

# take away 2 minutes
def maghrib_adjustment(maghrib_time):
    hours, minutes = map(int, maghrib_time.split(':'))
    total_minutes = hours * 60 + minutes
    return f"{total_minutes // 60:02d}:{total_minutes % 60:02d}"

# add 3 minutes then round to the nearest 10 minutes
def isha_adjustment(isha_time):
    hours, minutes = map(int, isha_time.split(':'))
    total_minutes = hours * 60 + minutes + 3
    rounded_minutes = ((total_minutes // 15) * 15) + 15
    return f"{rounded_minutes // 60:02d}:{rounded_minutes % 60:02d}"





# open the file and check format good
with open("moonsighting_times_2025.txt", "r") as file:
    lines = file.readlines()
    if not lines:
        raise ValueError("rekt1")
    if len(lines[0].split()) != 10:
        raise ValueError("rekt2")
    # can remove this and hard code initial prayer times as last fridays times
    if lines[0].split()[2] != "Fri": 
        print(lines[0][2])           
        raise ValueError("rekt3")

athan_times = []
iqama_times = []

parts = lines[0].split()
fajr_time = parts[3]
dhuhr_time = parts[5]
asr_time = parts[7]
isha_time = parts[9]

for line in lines:
    parts = line.split()

    parts[5] = ocis_dhuhr_adjustment(parts[5])
    parts[8] = ocis_mughrib_adjustment(parts[8])
    athan_times.append("\t".join(parts))

    if parts[2] == "Fri":
        fajr_time = fajr_adjustment(parts[3])
        dhuhr_time = dhuhr_adjustment(parts[5])
        asr_time = asr_adjustment(parts[7])
        isha_time = isha_adjustment(parts[9])

    maghrib_time = maghrib_adjustment(parts[8])
    
    parts[3] = fajr_time
    parts[5] = dhuhr_time
    parts[7] = asr_time
    parts[8] = maghrib_time
    parts[9] = isha_time
    
    iqama_times.append("\t".join(parts))

with open("athan_times_2025.txt", "w") as output_file:
    for line in athan_times:
        output_file.write(line + "\n")
        
with open("iqama_times_2025.txt", "w") as output_file:
    for line in iqama_times:
        output_file.write(line + "\n")


