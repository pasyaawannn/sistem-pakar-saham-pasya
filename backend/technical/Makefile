CXX = g++
CXXFLAGS = -std=c++17 -O2 -Wall

indicators: indicators.cpp
	$(CXX) $(CXXFLAGS) -o indicators indicators.cpp

clean:
	rm -f indicators

test: indicators
	@echo "100,101,99,102,103,104,102,101,103,105,107,106,108,110,109,108,110,112,114,113,115,117,116,118,120,119,121,123,122,124,126,125,127,129,128,130,132,131,133,135,134,136,138,137,139,141,140,142,144,143,145,147,146,148,150,149,151,153,152,154" | ./indicators

.PHONY: clean test
