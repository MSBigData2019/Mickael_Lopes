#!/usr/bin/python
# Copyright 2010 Google Inc.
# Licensed under the Apache License, Version 2.0
# http://www.apache.org/licenses/LICENSE-2.0

# Google's Python Class
# http://code.google.com/edu/languages/google-python-class/

import os
import re
import sys
import urllib.request as urlre

"""Logpuzzle exercise
Given an apache logfile, find the puzzle urls and download the images.

Here's what a puzzle url looks like:
10.254.254.28 - - [06/Aug/2007:00:13:48 -0700] "GET /~foo/puzzle-bar-aaab.jpg HTTP/1.0" 302 528 "-" "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.6) Gecko/20070725 Firefox/2.0.0.6"
"""


def read_urls(filename):
  """Returns a list of the puzzle urls from the given log file,
  extracting the hostname from the filename itself.
  Screens out duplicate urls and returns the urls sorted into
  increasing order."""
  i = filename.index('_')
  server = filename[i+1:]
  urls={}
  dict={}
  f = open(filename,'r')
  content = f.read()
  matchs  = re.findall(r'GET (\S+) HTTP',content)
  subpattern = '(-\w+-\w+.jpg)'
  for el in matchs:
    if 'puzzle' in el and el not in urls:
      submatch = re.search(subpattern,el)
      if submatch:
        key = submatch.group().split("-")[2]
        dict.update({key: 'https://' + server + el})
      else :
        dict.update({el:'https://'+server+el})
  for key in sorted(dict.keys()):
    urls.update({key:dict[key]})
  return urls.values()



def download_images(img_urls : list, dest_dir : str):
  """Given the urls already in the correct order, downloads
  each image into the given directory.
  Gives the images local filenames img0, img1, and so on.
  Creates an index.html in the directory
  with an img tag to show each local image file.
  Creates the directory if necessary.
  """
  if (dest_dir[-1]!="/"):
    dest_dir = dest_dir + "/"

  if not  os.path.exists(dest_dir) :
    os.mkdir(dest_dir)

  tplt = 'img'
  i=0
  n_files = len(img_urls)
  index_name = dest_dir+'index.html'
  f = open(index_name,'w')
  f.write("<verbatim>\n<html>\n<body>\n")

  for url in img_urls:
    file = tplt + str(i)

    filename = dest_dir+file
    abspath = os.path.abspath(dest_dir+file)
    urlre.urlretrieve(url,filename)
    f.write("<img src=\""+abspath+"\">")
    i = i + 1
    print(' ----- %i/%i files copied ----- '%(i,n_files))

  f.write("\n</body>\n</html>")
  f.close()
  return




def main():
  args = sys.argv[1:]

  if not args:
    print ('usage: [--todir dir] logfile ')
    sys.exit(1)

  todir = ''
  if args[0] == '--todir':
    todir = args[1]
    del args[0:2]

  img_urls = read_urls(args[0])

  if todir:
    download_images(img_urls, todir)
  else:
    print ('\n'.join(img_urls))

if __name__ == '__main__':
  main()
