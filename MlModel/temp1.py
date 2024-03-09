import wikipedia

def get_medical_info(topic):
    # wiki_wiki = wikipediaapi.Wikipedia('en',  extract_format=wikipediaapi.ExtractFormat.WIKI)
    page = wikipedia.summary(topic, sentences=5)
    if page:
        return page
    else:
        return "Information not found for {}".format(topic)

input_topic = input("Enter medical condition: ")
print(get_medical_info(input_topic))