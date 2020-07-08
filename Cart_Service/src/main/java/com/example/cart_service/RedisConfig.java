package com.example.cart_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.redis.serializer.JdkSerializationRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import javax.annotation.PreDestroy;
import java.util.Objects;

@Configuration
//@PropertySource("application.properties")
@EnableRedisRepositories
public class RedisConfig {

//    @Autowired
//    private Environment env;
//
//    @Value("${REDIS_HOST}")
//    private String redisHostName;

    @Bean
    public LettuceConnectionFactory redisConnectionFactory() {
//        RedisStandaloneConfiguration redisConf = new RedisStandaloneConfiguration();
//        redisConf.setHostName(Objects.requireNonNull(env.getProperty("spring.redis.host")));

        RedisStandaloneConfiguration redisStandaloneConfiguration = new RedisStandaloneConfiguration("cart-db", 6379);
        return new LettuceConnectionFactory(redisStandaloneConfiguration);

//        return new LettuceConnectionFactory(redisConf);
    }
    @Bean
    public RedisTemplate<?, ?> redisTemplate() {
        RedisTemplate<byte[], byte[]> template = new RedisTemplate<>();
        template.setConnectionFactory(redisConnectionFactory());
        return template;
    }
}

