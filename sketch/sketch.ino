#include <ESP8266WiFi.h>
#include <LiquidCrystal.h>

LiquidCrystal lcd(2, 3, 4, 5, 6, 7);
const char* ssid = "";
const char* password = "";
const char* host = "localhost:8080";

const int SOIL_A = 0;
int val;
String str;
void setup() {
  Serial.begin(9600);
  delay(10);
  lcd.begin(16, 2);
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  lcd.print("SOIL ");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected.");  
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  str = "Firebase";
}
void loop() {
  val = analogRead(SOIL_A);
  val = map(val, 0, 255, 0, 1023);
  val = constrain(val, 0, 1023);
  Serial.print("SOIL: ");
  Serial.println(val);
  lcd.setCursor(0, 1);
  lcd.print("  ");
  lcd.print(val);
  lcd.print("  ");
  lcd.print(str);
  Serial.print("Connecting to ");
  Serial.println(host);
  WiFiClient client;
  const int httpPort = 80;
  if (!client.connect(host, httpPort)) {
    Serial.println("Connection refused");
    return;
  }
  String url = "/soil?val=";
  url = url + val;
  Serial.print("Requesting URL: ");
  Serial.println(url);
  client.print(String("GET ") + url + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" + 
               "Connection: close\r\n\r\n");
  delay(10);
  Serial.println("Respond:");
  while(client.available()){
    String line = client.readStringUntil('\r');
    Serial.print(line);
  }
  Serial.println();
  Serial.println("closing connection");
  delay(2000);
}

