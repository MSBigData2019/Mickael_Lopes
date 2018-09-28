#!/usr/bin/python
# Copyright 2010 Google Inc.
# Licensed under the Apache License, Version 2.0
# http://www.apache.org/licenses/LICENSE-2.0

# Google's Python Class
# http://code.google.com/edu/languages/google-python-class/

import sys
import re
import os
import shutil
import zipfile

from fnmatch import fnmatch

"""Copy Special exercise
"""

# +++your code here+++
# Write functions and modify main() to call them

def get_special_paths(dir : str, abs_paths : dict):
    '''
    Gather a list of the absolute paths of the special files in all the directories.
    In the simplest case, just print that list. Print one absolute path per line.
    :param dir: str - given directory
    :return:
    '''
    pattern = "*__*__*"
    files = os.listdir(dir)
    for file in files :
        if fnmatch(file,pattern):
            if file not in abs_paths:
                relative_path = dir + "/" + file
                abs_paths.update({file:os.path.abspath(relative_path)})
            else:
                print("------ERROR------")
                print("2 files have the same name accross the directories")
                print("Redundant file : ", file)
                sys.exit(0)
    return abs_paths

def copy_to(paths : dict, dir : str):
    """
    Copy the list of files into the target directory. If target category does not exist, it will create it
    :param paths: dictionary with (key:value) = (filename:absolute path)
    :param dir: target directory for the copy
    :return:
    """
    if not os.path.exists(dir):
        os.mkdir(dir)               # if target folder does not exis => create the folder

    for file in paths.keys():
        shutil.copy(paths[file],dir) #Copy the file src in the given
    return

def zip_to(paths : dict , zippath: str):
    """
    Zip the given file in path insidethe given zipfile. If the zip file is in a folder that does  not exit, the function will error out
    :param paths: dictionary with (key:value) = (filename:absolute path)
    :param zippath: relative or absolute zip file name
    :return:
    """
    a = zippath.rsplit(r'/',1)
    if len(a) ==1 :
        zipfolder ='.'
    else:
        zipfolder=a[0]
    if not os.path.exists(zipfolder):
        print('error: target folder for the zip does not exist')
        sys.exit(1)
    with zipfile.ZipFile(zippath, 'w') as myzip:
        for file, path in paths.items():
            myzip.write(path,file)          #zippera le file dans le root du zip sans recopier le directory tree
    return


def main():
  # This basic command line argument parsing code is provided.
  # Add code to call your functions below.

  # Make a list of command line arguments, omitting the [0] element
  # which is the script itself.

  args = sys.argv[1:]
  if not args:
    print ("usage: [--todir dir][--tozip zipfile] dir [dir ...]")
    sys.exit(1)
    """
    # For testing purpose
  l = '.'
  abs_path = {}
  get_special_paths('.',abs_path)
  get_special_paths('test',abs_path)
    """

  # todir and tozip are either set from command line
  # or left as the empty string.
  # The args array is left just containing the dirs.
  todir = ''
  copy = False
  zip = False

  if args[0] == '--todir':
    todir = args[1]
    copy=True
    del args[0:2]

  tozip = ''
  if args[0] == '--tozip':
    tozip = args[1]
    zip=True
    del args[0:2]

  if len(args) == 0:
    print ("error: must specify one or more dirs")
    sys.exit(1)

  # +++your code here+++
  # Call your functions
  abs_path = {}
  if copy:
    for arg in args:
        get_special_paths(arg, abs_path)
    copy_to(abs_path,todir)
  elif zip:
    for arg in args:
        get_special_paths(arg, abs_path)
    zip_to(abs_path,tozip)
  else :
    for arg in args:
      get_special_paths(arg,abs_path)
    for file in abs_path.keys():
        print(abs_path[file])

if __name__ == "__main__":
  main()
