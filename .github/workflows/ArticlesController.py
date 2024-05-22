import glob
import json

# get all articles
files = glob.glob("src/data/articles/each/*.md")

#get all metadata
metadata = []
for file in files:
    with open(file, 'r') as f:
        content = f.read()
        
        # get metadata
        # between "<!-- META" and "META -->"
        START_SYMBOL = "<!-- META"
        END_SYMBOL = "META -->"
        start_index = content.find(START_SYMBOL)
        end_index = content.find(END_SYMBOL)
        metadatumString = content[start_index + len(START_SYMBOL) : end_index]
        
        # JSON to dictionary
        metadatum = json.loads(metadatumString)
        
        # into list
        metadata.append(metadatum)
        
