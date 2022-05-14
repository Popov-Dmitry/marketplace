package com.github.popovdmitry.nstu.gw.orderservice.model;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "returns")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Return {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(example = "341", position = 0)
    private Long id;

    @Column(name = "reason")
    @ApiModelProperty(example = "QUALITY", position = 1)
    private Reason reason;

    @Column(name = "description")
    @ApiModelProperty(example = "Пятно на одежде", position = 2)
    private String description;

    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private Order order;
}
