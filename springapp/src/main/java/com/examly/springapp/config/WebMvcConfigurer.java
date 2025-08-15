@Bean
public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/**")
                    .allowedOrigins("https://8081-faedbbbbecaaddcbcedcecbaebefef.premiumproject.examly.io/")
                    .allowedMethods("GET","POST","PUT","DELETE","OPTIONS");
        }
    };
}
