def stock_picker(stock_prices)
    array_start = stock_prices[0]
    min_i = 0
  
    profit = 0
    days = [0, 0]
  
    stock_prices.each_with_index do |price, index|
      if price < array_start
        array_start = price
        min_i = index
        next
      end
      
      if price - array_start > profit
        profit = price - array_start
        days = [min_i, index]
      end
    end
    print days, "\n"
    puts profit
  end
  
  input = [17, 3, 6, 9, 15, 8, 5, 1, 10]
  
  stock_picker(input)