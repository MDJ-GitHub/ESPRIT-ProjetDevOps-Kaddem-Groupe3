package tn.esprit.spring.kaddem.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Définissez ici le chemin de l'API que vous souhaitez autoriser
                .allowedOrigins("http://localhost:4200") // Autorise les requêtes depuis ce domaine Angular
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Autorise les méthodes HTTP spécifiées
                .allowCredentials(true); // Autorise l'envoi de cookies avec la requête (si nécessaire)
    }
}
