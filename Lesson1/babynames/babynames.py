#!/usr/bin/python
# Copyright 2010 Google Inc.
# Licensed under the Apache License, Version 2.0
# http://www.apache.org/licenses/LICENSE-2.0

# Google's Python Class
# http://code.google.com/edu/languages/google-python-class/

import sys
import re
from bs4 import BeautifulSoup


"""Baby Names exercise

Define the extract_names() function below and change main()
to call it.

For writing regex, it's nice to include a copy of the target
text for inspiration.

Here's what the html looks like in the baby.html files:
...
<h3 align="center">Popularity in 1990</h3>
....
<tr align="right"><td>1</td><td>Michael</td><td>Jessica</td>
<tr align="right"><td>2</td><td>Christopher</td><td>Ashley</td>
<tr align="right"><td>3</td><td>Matthew</td><td>Brittany</td>
...

Suggested milestones for incremental development:
 -Extract the year and print it
 -Extract the names and rank numbers and just print them
 -Get the names data into a dict and print it
 -Build the [year, 'name rank', ... ] list and print it
 -Fix main() to use the extract_names list
"""


def extract_names(filename):
  """
  Given a file name for baby.html, returns a list starting with the year string
  followed by the name-rank strings in alphabetical order.
  ['2006', 'Aaliyah 91', Aaron 57', 'Abagail 895', ' ...]
  """
  # Open the file and parse it via BeautifulSoup Parser
  f = open(filename, 'r')
  text = f.read()
  soup = BeautifulSoup(text, 'lxml')


  year = extract_year(soup)
  names = extract_name_rank(soup)

  name_list= [" ".join((key,names[key])) for key in sorted(names.keys())] # Create sorted list name rank
  name_list.insert(0,str(year))                                           # add the year at the beginning of the list
  return name_list

# Extract the year from a parsed babyname file (aka BeautifulSoup object)
def extract_year(p_html):
  """
  Given a parsed html file (BeautifulSoup object) return the year of birth indicated in the HTML
  :param pHTML: parsed babyname HTML file (BeautifulSoup object)
  :return: int: Year of birth indicated in the parsed HTML (p_html) object
  """
  year_tag = p_html.find('input',{'id':'yob'}) # Year of birth inside a tag input with attribute id = yob
  return int(year_tag.attrs['value'])


def extract_name_rank(p_html):
  '''
  Given a parsed html (BeautifulSoup object) return the dictionary (name:rank) sorted in alphabetical order
  :param p_html: parsed babyname HTML file (BeautifulSoup object)
  :return dict_name: dictionary (name:rank) sorted in alphabetical order
  '''
  name_tags = p_html.find_all('tr', {'align': 'right'})  # Capture the tag tr with the information rank - male name - female name
  name_dict = {}
  for k in range(len(name_tags)):
    name_info = name_tags[k].getText('-').split('-')     # Return a list of string (rank,male name,female name,'\n')
    if name_info[1] not in name_dict:
      name_dict.update({name_info[1]:name_info[0]})               # Add the argument (key,value) with key = male name, value = rank
    if name_info[2] not in name_dict:
      name_dict.update({name_info[2]:name_info[0]})               # Add the argument (key,value) with key = female name, value = rank
  return name_dict

def main():
  # This command-line parsing code is provided.
  # Make a list of command line arguments, omitting the [0] element
  # which is the script itself.
  '''
  #for testing
  extract_names('/media/storage/Documents/Telecom Paris - Classes/kitdatascience/Lesson1/google-python-exercises/babynames/baby1994.html')
  '''
  args = sys.argv[1:]

  if not args:
    print ('usage: [--summaryfile] file [file ...]')
    sys.exit(1)

  # If summary flag is noticed, call the function extract name
  summary = False
  if args[0] == '--summaryfile':
    summary = True
    del args[0]

  # +++your code here+++
  # For each filename, get the names, then either print the text output
  # or write it to a summary file
  for filename in args:
    names_list = extract_names(filename)
    text = "\n".join(names_list)+"\n"
    if summary:
      file = open(filename+'.summary','w')
      file.write(text)
      file.close()
    else:
      print(text)
if __name__ == '__main__':
  main()
