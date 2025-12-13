# Command Line Interface

Status: In progress
Courses: Scrimba: Backend (https://www.notion.so/Scrimba-Backend-29f8edf80b228056b374f857cf823c58?pvs=21)
Completed: No
Type: Beginner

## Terminology Crash Course

**Shell** - a program that lets you interact with operating system (ie. Linux)

- interprets the commands you type into the CLI
- Bash, zsh, etc

**CLI** - concept of interacting with the OS through typing commands

- displayed inside an app (Terminal, VS Code, iTerm)
- same app and CLI can run several different shells
- interface does not limit the shell you can run
1. *Operating system* - > in charge of hardware and software
2. *Shell* can communicate with the OS by typing commands
3. To control shell itself use *CLI* - type commands that are processed by the shell and control the OS
4. *Terminal app* - access the CLI to type out commands, app supports this type of interface

## Options

`rm -r [dir_name]` - delete a directory that is not empty, use `-r` flag option which stands for recursive

`ls -l` - list items with detailed info, `-l` flag stands for long showing files/directories in long format

Can add more functionality to default behavior of a command, single dash for short options

- two dashes for long options `rm --recursive [dir_name]`
- case insensitive
- recursive
- show line number
- global

## Find files & Directories

`pwd` - print working directory

`ls` - list items

`cd` - change directory

`..` - up one in the file tree

`rm` - remove file

`touch` - create file

`find [path] [option] [expression` 

`find . -name 'forest*` -

- find in current working directory `.`
- - `-name` option to look for something by name,
- name of what we are looking for - any files or directories with `forest`
- case insensitive: `-iname 'forest*`
- search by type: `-type f` / `-type d`
- `-type d -iname 'forest*'`

```bash
find .. -type f -iname 'large*'

OUTPUT:
// ../geography_game/forests/large_country_by_population.txt
```

The path defines where the search starts, all child elements are included

- Relative fiile paths: `../forests`
- absolute file paths: `/Users/ajo/Coding/Scrimba/command_line/geography_game/forests`
- Current directory `.`
- parent directory `..`
- home directory `~`
- root directory `/`

To kill a process use `CTRL + C` - when you are stuck in an unfinished action and need to quickly escape

## Rename, Move & Copy

Use same command `mv` to rename and move files around

```bash
//rename
mv [old_name} [new_name]
mv old_cities.txt new_cities.txt 

// move
mv [name] [new_location]
mv capitals.txt ./cities 
```

if new location does not yet exist, `mv` will rename item instead of moving it

```bash
// copy
cp [original] [copy_name]
cp team.txt team_backup.txt

cp -r cities cities_backup
// -r need to use to copy directories
```

Recursive coping, using the `-r` option, means that every item at any level inside the directory is copied individually.

## Search in files

`grep [pattern] [file]`

global search for a regular expression pattern

- search in one file, in multiple separated by spaces, use wildcard character `*`
- `-n- will give line number that matches the pattern

```bash
grep 'CEO' team.txt

grep -n ',' team*
// all files in team that contain a file, displaying the line number
```

- show line numbers `-n`
- case insensitive `-i`
- search recursively `-r`
- only use `-r` when using [directory] to search files in that directory and any subdirectories

```bash
grep -r ',' .
```

every line containing a comma, in every file that lives in the current directory or a subdirectory at any depth

## Replace content in files

`sed 's/pattern/replacement/' [filename]`

```bash
sed 's/,/:' team*

// repalce all commas with colors in a file that starts with team
```

- only the first instance of the search pattern in each line is replaced
- the file itself is not modified. only the printed output contains the replacement
- `sed `s/pattern/replacement/[options]' [file]`

```bash
sed 's/a/z/gI' team*
```

every single instance of letter a will be replaced with z, lower case z

- case insensitive `-I`
- global (all instances) `-g`

```bash
// redirect output
sed 's/,/:/ team* > colon_team.txt

sed -i 's/.../.../options' [file]
```

## Count values in files

`wc [filename]` - word count

```bash
wc team.txt
// 5 - number of lines
// 17 number of words
// 112 number of bytes
```

- `wc -l` - just lines
    - `wc -w` number of words
    - bytes: `wc -c`
    - characters `wc -m`
    - bytes and characters have the same value in plain english because 1 UTF-8 character = 1 byte

## Sort file contents

`sort [filename]`

```bash
sort team_members.txt
```

- reverse `-r` sorts z-a
- numeric `-n`
- by default, sort treats everything as string. without the `-n` option ‘11’ comes before ‘2’

## Remove duplicates

`uniq [filename]`

any adjacent duplicates are removed from the file

### Pipe character `|`

`[cmd 1] | [cmd 2\`

Takes the output of the first command and uses it as input for the second command

```bash
sort team_members.txt | uniq
```

1. team_members.txt is sorted alphabetically - all duplicates in file are not adjacent
2. output of `sort team_members.txt` is passed as input to `uniq`
3. `uniq` removes duplicates from the sorted file

```bash
sort team_members.txt | uniq > sorted_team.txt
```