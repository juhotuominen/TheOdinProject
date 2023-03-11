# Method for counting
def substrings(text, dictionary)
    result = Hash.new(0)
    text = text.downcase
  
    # Search for wrods in dictionary
    dictionary.each do |word|
      matches = text.scan(word).length
      result[word] = matches unless matches == 0
    end
    
    print "#{dictionary[0]} count: "
    puts result
  end
  
  # Initialize dictionaries
  cowboy_dictionary = ["Cowboy_dictionary","down","go","going","how","howdy","it","i","low","own","part","partner","sit"]
  pirate_dictionary = ["Pirate_dictionary","ar","ay","ahoy","captain","ground","own","on","sight","ship","sink"]
  dictionary = ["Dictionary"]
  dictionary += cowboy_dictionary + pirate_dictionary
  
  # Test cases
  substrings("Howdy partner! Or should I say ahoy captain? Sit down with me.", dictionary)
  substrings("Howdy partner, sit down! How's it going?", cowboy_dictionary)
  substrings("Ahoy, Captain! Ground on sight and ship is sinking!", pirate_dictionary)
