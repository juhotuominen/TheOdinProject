
def caesar_cipher(phrase, shift)

    crypted_phrase = phrase.split('').map do |char|

        if char.ord.between?(65, 90)
            char = char.ord + shift
            char = (char - 90) + 64 until char < 91
            char.chr
        elsif char.ord.between?(97, 122)
            char = char.ord + shift
            char = (char - 122) + 96 until char < 123
            char.chr
        else char
        end
    end
     puts crypted_phrase.join("")
end


puts "Give phrase to encrypt: "
phrase = gets
puts "Give number to use as a shifter: "
num = gets
shift = num.to_i

caesar_cipher(phrase, shift)


