package com.recharged.backend.api.model;

import com.recharged.backend.model.Inventory;
import jakarta.validation.constraints.*;

public class ProductBody {
    @NotNull
    @NotBlank
    @Size(min=1, max=255)
    private String name;
    @NotNull
    @NotBlank
    @Size(min=1, max=255)
    private String shortDesc;
    @NotNull
    @NotBlank
    @Size(min=1, max=255)
    private String longDesc;
    @NotNull
    @NotBlank
    private Double price;
    private Inventory inventory;

    public String getName() {
        return name;
    }

    public String getShortDesc() {
        return shortDesc;
    }

    public String getLongDesc() {
        return longDesc;
    }

    public Double getPrice() {
        return price;
    }

    public Inventory getInventory() {
        return inventory;
    }
}
